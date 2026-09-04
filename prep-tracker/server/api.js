const express = require('express');
const cors = require('cors');

let server;

function startApiServer(db) {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  const PORT = parseInt(db.prepare('SELECT value FROM settings WHERE key = ?').get('api_port')?.value || '3847');

  // ─── Health check ───
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'PrepTracker', version: '1.0.0' });
  });

  // ─── Problems CRUD ───
  app.get('/api/problems', (req, res) => {
    const { platform, category, difficulty, limit = 100, offset = 0 } = req.query;
    let sql = 'SELECT * FROM problems WHERE 1=1';
    const params = [];
    if (platform) { sql += ' AND platform = ?'; params.push(platform); }
    if (category) { sql += ' AND category = ?'; params.push(category); }
    if (difficulty) { sql += ' AND difficulty = ?'; params.push(difficulty); }
    sql += ' ORDER BY solved_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    res.json(db.prepare(sql).all(...params));
  });

  app.post('/api/problems', (req, res) => {
    const { platform, problem_name, problem_url, difficulty, category, status, notes } = req.body;
    const stmt = db.prepare(
      'INSERT INTO problems (platform, problem_name, problem_url, difficulty, category, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    const result = stmt.run(platform, problem_name, problem_url || '', difficulty || 'medium', category || 'uncategorized', status || 'solved', notes || '');

    // Update daily log
    const today = new Date().toISOString().split('T')[0];
    db.prepare(`
      INSERT INTO daily_logs (date, problems_solved, platforms_used)
      VALUES (?, 1, ?)
      ON CONFLICT(date) DO UPDATE SET
        problems_solved = problems_solved + 1,
        platforms_used = CASE
          WHEN platforms_used NOT LIKE ? THEN json_insert(platforms_used, '$[#]', ?)
          ELSE platforms_used
        END
    `).run(today, JSON.stringify([platform]), `%${platform}%`, platform);

    res.json({ id: result.lastInsertRowid, success: true });
  });

  app.delete('/api/problems/:id', (req, res) => {
    db.prepare('DELETE FROM problems WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  // ─── Sessions CRUD ───
  app.get('/api/sessions', (req, res) => {
    const { pillar, limit = 50 } = req.query;
    let sql = 'SELECT * FROM sessions WHERE 1=1';
    const params = [];
    if (pillar) { sql += ' AND pillar = ?'; params.push(pillar); }
    sql += ' ORDER BY created_at DESC LIMIT ?';
    params.push(parseInt(limit));
    res.json(db.prepare(sql).all(...params));
  });

  app.post('/api/sessions', (req, res) => {
    const { pillar, topic, duration_minutes, notes, resources } = req.body;
    const stmt = db.prepare(
      'INSERT INTO sessions (pillar, topic, duration_minutes, notes, resources) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(pillar, topic, duration_minutes || 0, notes || '', JSON.stringify(resources || []));

    // Update daily log
    const today = new Date().toISOString().split('T')[0];
    db.prepare(`
      INSERT INTO daily_logs (date, study_minutes)
      VALUES (?, ?)
      ON CONFLICT(date) DO UPDATE SET
        study_minutes = study_minutes + ?
    `).run(today, duration_minutes || 0, duration_minutes || 0);

    res.json({ id: result.lastInsertRowid, success: true });
  });

  // ─── Daily logs ───
  app.get('/api/daily-logs', (req, res) => {
    const { days = 365 } = req.query;
    const logs = db.prepare(`
      SELECT * FROM daily_logs
      WHERE date >= date('now', '-' || ? || ' days', 'localtime')
      ORDER BY date ASC
    `).all(parseInt(days));
    res.json(logs);
  });

  app.get('/api/daily-logs/today', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const log = db.prepare('SELECT * FROM daily_logs WHERE date = ?').get(today);
    res.json(log || { date: today, problems_solved: 0, study_minutes: 0, streak_maintained: 0, platforms_used: '[]' });
  });

  // ─── Streak calculation ───
  app.get('/api/streaks', (req, res) => {
    const logs = db.prepare(`
      SELECT date, problems_solved, study_minutes FROM daily_logs
      ORDER BY date DESC
    `).all();

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const goalProblems = parseInt(db.prepare('SELECT value FROM settings WHERE key = ?').get('daily_problem_goal')?.value || '3');

    // Calculate current streak
    for (let i = 0; i < 400; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      const log = logs.find(l => l.date === dateStr);

      if (log && (log.problems_solved >= goalProblems || log.study_minutes >= 60)) {
        currentStreak++;
      } else if (i === 0) {
        // Today hasn't met goal yet, that's ok
        continue;
      } else {
        break;
      }
    }

    // Calculate longest streak
    for (const log of logs.reverse()) {
      if (log.problems_solved >= goalProblems || log.study_minutes >= 60) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    const totalProblems = db.prepare('SELECT COUNT(*) as count FROM problems').get().count;
    const totalMinutes = db.prepare('SELECT COALESCE(SUM(study_minutes), 0) as total FROM daily_logs').get().total;

    res.json({
      currentStreak,
      longestStreak,
      totalProblems,
      totalStudyHours: Math.round(totalMinutes / 60 * 10) / 10,
      goalProblems,
    });
  });

  // ─── Roadmap progress ───
  app.get('/api/roadmap', (req, res) => {
    const progress = db.prepare('SELECT * FROM roadmap_progress ORDER BY pillar, topic').all();
    res.json(progress);
  });

  app.post('/api/roadmap', (req, res) => {
    const { pillar, topic, subtopic, status, progress_percent } = req.body;
    const stmt = db.prepare(`
      INSERT INTO roadmap_progress (pillar, topic, subtopic, status, progress_percent, last_updated)
      VALUES (?, ?, ?, ?, ?, datetime('now', 'localtime'))
      ON CONFLICT(pillar, topic, subtopic) DO UPDATE SET
        status = excluded.status,
        progress_percent = excluded.progress_percent,
        last_updated = datetime('now', 'localtime')
    `);
    stmt.run(pillar, topic, subtopic || '', status || 'not_started', progress_percent || 0);
    res.json({ success: true });
  });

  // ─── Reminders CRUD ───
  app.get('/api/reminders', (req, res) => {
    res.json(db.prepare('SELECT * FROM reminders ORDER BY created_at DESC').all());
  });

  app.post('/api/reminders', (req, res) => {
    const { title, description, cron_expression, one_time_date } = req.body;
    const result = db.prepare(
      'INSERT INTO reminders (title, description, cron_expression, one_time_date) VALUES (?, ?, ?, ?)'
    ).run(title, description || '', cron_expression || null, one_time_date || null);
    res.json({ id: result.lastInsertRowid, success: true });
  });

  app.put('/api/reminders/:id', (req, res) => {
    const { title, description, cron_expression, one_time_date, is_active } = req.body;
    db.prepare(`
      UPDATE reminders SET title=?, description=?, cron_expression=?, one_time_date=?, is_active=?
      WHERE id=?
    `).run(title, description, cron_expression, one_time_date, is_active ? 1 : 0, req.params.id);
    res.json({ success: true });
  });

  app.delete('/api/reminders/:id', (req, res) => {
    db.prepare('DELETE FROM reminders WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  // ─── Platform stats ───
  app.get('/api/platform-stats', (req, res) => {
    res.json(db.prepare('SELECT * FROM platform_stats').all());
  });

  app.post('/api/platform-stats', (req, res) => {
    const { platform, username, stats_json } = req.body;
    db.prepare(`
      INSERT INTO platform_stats (platform, username, stats_json, last_synced)
      VALUES (?, ?, ?, datetime('now', 'localtime'))
      ON CONFLICT(platform) DO UPDATE SET
        username = excluded.username,
        stats_json = excluded.stats_json,
        last_synced = datetime('now', 'localtime')
    `).run(platform, username || '', JSON.stringify(stats_json || {}));
    res.json({ success: true });
  });

  // ─── Settings ───
  app.get('/api/settings', (req, res) => {
    const settings = {};
    db.prepare('SELECT * FROM settings').all().forEach(row => {
      settings[row.key] = row.value;
    });
    res.json(settings);
  });

  app.put('/api/settings', (req, res) => {
    const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
    Object.entries(req.body).forEach(([key, value]) => {
      stmt.run(key, String(value));
    });
    res.json({ success: true });
  });

  // ─── Stats aggregation ───
  app.get('/api/stats/overview', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
    const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];

    const todayLog = db.prepare('SELECT * FROM daily_logs WHERE date = ?').get(today) || { problems_solved: 0, study_minutes: 0 };

    const weekProblems = db.prepare('SELECT COALESCE(SUM(problems_solved), 0) as total FROM daily_logs WHERE date >= ?').get(weekAgo).total;
    const monthProblems = db.prepare('SELECT COALESCE(SUM(problems_solved), 0) as total FROM daily_logs WHERE date >= ?').get(monthAgo).total;
    const totalProblems = db.prepare('SELECT COUNT(*) as count FROM problems').get().count;

    const weekMinutes = db.prepare('SELECT COALESCE(SUM(study_minutes), 0) as total FROM daily_logs WHERE date >= ?').get(weekAgo).total;
    const monthMinutes = db.prepare('SELECT COALESCE(SUM(study_minutes), 0) as total FROM daily_logs WHERE date >= ?').get(monthAgo).total;

    const byDifficulty = db.prepare(`
      SELECT difficulty, COUNT(*) as count FROM problems GROUP BY difficulty
    `).all();

    const byPlatform = db.prepare(`
      SELECT platform, COUNT(*) as count FROM problems GROUP BY platform
    `).all();

    const byCategory = db.prepare(`
      SELECT category, COUNT(*) as count FROM problems GROUP BY category ORDER BY count DESC LIMIT 15
    `).all();

    const weeklyTrend = db.prepare(`
      SELECT date, problems_solved, study_minutes FROM daily_logs
      WHERE date >= ? ORDER BY date ASC
    `).all(weekAgo);

    const monthlyTrend = db.prepare(`
      SELECT date, problems_solved, study_minutes FROM daily_logs
      WHERE date >= ? ORDER BY date ASC
    `).all(monthAgo);

    res.json({
      today: todayLog,
      weekProblems,
      monthProblems,
      totalProblems,
      weekStudyHours: Math.round(weekMinutes / 60 * 10) / 10,
      monthStudyHours: Math.round(monthMinutes / 60 * 10) / 10,
      byDifficulty,
      byPlatform,
      byCategory,
      weeklyTrend,
      monthlyTrend,
    });
  });

  // ─── Bulk import from Chrome extension ───
  app.post('/api/sync/bulk', (req, res) => {
    const { problems = [], platform, username } = req.body;

    const insertProblem = db.prepare(`
      INSERT OR IGNORE INTO problems (platform, problem_name, problem_url, difficulty, category, status, solved_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((items) => {
      for (const p of items) {
        insertProblem.run(
          platform || p.platform,
          p.problem_name || p.name,
          p.problem_url || p.url || '',
          p.difficulty || 'medium',
          p.category || 'uncategorized',
          p.status || 'solved',
          p.solved_at || new Date().toISOString()
        );
      }
    });

    try {
      insertMany(problems);

      // Update platform stats
      if (platform && username) {
        db.prepare(`
          INSERT INTO platform_stats (platform, username, stats_json, last_synced)
          VALUES (?, ?, ?, datetime('now', 'localtime'))
          ON CONFLICT(platform) DO UPDATE SET
            username = excluded.username,
            stats_json = excluded.stats_json,
            last_synced = datetime('now', 'localtime')
        `).run(platform, username, JSON.stringify(req.body.stats || {}));
      }

      res.json({ success: true, imported: problems.length });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  server = app.listen(PORT, () => {
    console.log(`[API] PrepTracker API running on http://localhost:${PORT}`);
  });

  return server;
}

function stopApiServer() {
  if (server) server.close();
}

module.exports = { startApiServer, stopApiServer };
