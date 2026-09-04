const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

let db;

function initDatabase() {
  const dbPath = path.join(app.getPath('userData'), 'preptracker.db');
  db = new Database(dbPath);

  // Enable WAL mode for better performance
  db.pragma('journal_mode = WAL');

  // Create all tables
  db.exec(`
    -- Problems solved (auto-scraped + manual)
    CREATE TABLE IF NOT EXISTS problems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT NOT NULL,
      problem_name TEXT NOT NULL,
      problem_url TEXT,
      difficulty TEXT DEFAULT 'medium',
      category TEXT DEFAULT 'uncategorized',
      status TEXT DEFAULT 'solved',
      solved_at DATETIME DEFAULT (datetime('now', 'localtime')),
      notes TEXT
    );

    -- Study sessions
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pillar TEXT NOT NULL,
      topic TEXT NOT NULL,
      duration_minutes INTEGER DEFAULT 0,
      notes TEXT,
      resources TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT (datetime('now', 'localtime'))
    );

    -- Daily snapshots for streaks
    CREATE TABLE IF NOT EXISTS daily_logs (
      date TEXT PRIMARY KEY,
      problems_solved INTEGER DEFAULT 0,
      study_minutes INTEGER DEFAULT 0,
      streak_maintained BOOLEAN DEFAULT 0,
      platforms_used TEXT DEFAULT '[]'
    );

    -- Roadmap progress
    CREATE TABLE IF NOT EXISTS roadmap_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pillar TEXT NOT NULL,
      topic TEXT NOT NULL,
      subtopic TEXT,
      status TEXT DEFAULT 'not_started',
      progress_percent INTEGER DEFAULT 0,
      last_updated DATETIME DEFAULT (datetime('now', 'localtime')),
      UNIQUE(pillar, topic, subtopic)
    );

    -- Reminders
    CREATE TABLE IF NOT EXISTS reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      cron_expression TEXT,
      one_time_date DATETIME,
      is_active BOOLEAN DEFAULT 1,
      last_triggered DATETIME,
      created_at DATETIME DEFAULT (datetime('now', 'localtime'))
    );

    -- Platform stats (scraped cache)
    CREATE TABLE IF NOT EXISTS platform_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT NOT NULL,
      username TEXT,
      stats_json TEXT DEFAULT '{}',
      last_synced DATETIME DEFAULT (datetime('now', 'localtime')),
      UNIQUE(platform)
    );

    -- Settings
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  // Insert default settings
  const insertSetting = db.prepare(
    'INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)'
  );
  insertSetting.run('daily_problem_goal', '3');
  insertSetting.run('daily_study_hours_goal', '2');
  insertSetting.run('streak_start_date', new Date().toISOString().split('T')[0]);
  insertSetting.run('leetcode_username', '');
  insertSetting.run('neetcode_username', '');
  insertSetting.run('hackerrank_username', '');
  insertSetting.run('gfg_username', '');
  insertSetting.run('api_port', '3847');

  console.log('[DB] Database initialized at:', dbPath);
  return db;
}

function getDb() {
  return db;
}

module.exports = { initDatabase, getDb };
