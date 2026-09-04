const { Notification } = require('electron');
const cron = require('node-cron');

const activeJobs = [];

function setupNotifications(db) {
  // Daily morning reminder at 9 AM
  const morningJob = cron.schedule('0 9 * * *', () => {
    showNotification(
      '🌅 Good Morning!',
      'Time to start your prep! Open PrepTracker and crush your goals today.'
    );
  });
  activeJobs.push(morningJob);

  // Evening check at 8 PM if goals not met
  const eveningJob = cron.schedule('0 20 * * *', () => {
    const today = new Date().toISOString().split('T')[0];
    const log = db.prepare('SELECT * FROM daily_logs WHERE date = ?').get(today);
    const goal = parseInt(db.prepare('SELECT value FROM settings WHERE key = ?').get('daily_problem_goal')?.value || '3');

    if (!log || log.problems_solved < goal) {
      const remaining = goal - (log?.problems_solved || 0);
      showNotification(
        '⚠️ Don\'t Break Your Streak!',
        `You still need to solve ${remaining} more problem${remaining > 1 ? 's' : ''} today. Keep going!`
      );
    }
  });
  activeJobs.push(eveningJob);

  // Check for stale topics every Sunday at 10 AM
  const weeklyJob = cron.schedule('0 10 * * 0', () => {
    const staleTopics = db.prepare(`
      SELECT topic FROM roadmap_progress
      WHERE status = 'in_progress'
      AND last_updated < datetime('now', '-7 days', 'localtime')
      LIMIT 3
    `).all();

    if (staleTopics.length > 0) {
      const topicNames = staleTopics.map(t => t.topic).join(', ');
      showNotification(
        '📋 Weekly Review',
        `These topics need attention: ${topicNames}. Don't let them slip!`
      );
    }
  });
  activeJobs.push(weeklyJob);

  // Load user-created reminders
  loadCustomReminders(db);

  console.log('[Notifications] Scheduler active with', activeJobs.length, 'jobs');
}

function loadCustomReminders(db) {
  const reminders = db.prepare('SELECT * FROM reminders WHERE is_active = 1 AND cron_expression IS NOT NULL').all();

  for (const reminder of reminders) {
    try {
      if (cron.validate(reminder.cron_expression)) {
        const job = cron.schedule(reminder.cron_expression, () => {
          showNotification(`⏰ ${reminder.title}`, reminder.description || 'Time for your scheduled task!');
          db.prepare('UPDATE reminders SET last_triggered = datetime(\'now\', \'localtime\') WHERE id = ?').run(reminder.id);
        });
        activeJobs.push(job);
      }
    } catch (err) {
      console.error('[Notifications] Failed to schedule reminder:', reminder.id, err.message);
    }
  }
}

function showNotification(title, body) {
  if (Notification.isSupported()) {
    const notification = new Notification({
      title,
      body,
      icon: undefined, // Will use app icon
      silent: false,
    });
    notification.show();
  }
}

module.exports = { setupNotifications, showNotification };
