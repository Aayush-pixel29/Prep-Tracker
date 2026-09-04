import React, { useState, useEffect } from 'react';
import { API_BASE } from '../utils/helpers';

const CRON_PRESETS = [
  { label: 'Every day at 9 AM', value: '0 9 * * *' },
  { label: 'Every day at 8 PM', value: '0 20 * * *' },
  { label: 'Every weekday at 9 AM', value: '0 9 * * 1-5' },
  { label: 'Every Saturday at 10 AM', value: '0 10 * * 6' },
  { label: 'Every Sunday at 10 AM', value: '0 10 * * 0' },
  { label: 'Every 2 hours', value: '0 */2 * * *' },
  { label: 'Custom', value: '' },
];

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', cron_expression: '0 9 * * *', type: 'recurring' });

  useEffect(() => {
    fetchReminders();
  }, []);

  function fetchReminders() {
    fetch(`${API_BASE}/api/reminders`)
      .then(r => r.json())
      .then(setReminders)
      .catch(() => {});
  }

  function createReminder() {
    const body = {
      title: form.title,
      description: form.description,
      cron_expression: form.type === 'recurring' ? form.cron_expression : null,
      one_time_date: form.type === 'one_time' ? form.one_time_date : null,
    };

    fetch(`${API_BASE}/api/reminders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(() => {
        fetchReminders();
        setShowModal(false);
        setForm({ title: '', description: '', cron_expression: '0 9 * * *', type: 'recurring' });
      })
      .catch(() => {});
  }

  function toggleReminder(id, currentActive) {
    const reminder = reminders.find(r => r.id === id);
    if (!reminder) return;

    fetch(`${API_BASE}/api/reminders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...reminder, is_active: !currentActive }),
    })
      .then(() => fetchReminders())
      .catch(() => {});
  }

  function deleteReminder(id) {
    fetch(`${API_BASE}/api/reminders/${id}`, { method: 'DELETE' })
      .then(() => fetchReminders())
      .catch(() => {});
  }

  function describeCron(expr) {
    const preset = CRON_PRESETS.find(p => p.value === expr);
    if (preset && preset.label !== 'Custom') return preset.label;
    return `Cron: ${expr}`;
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="page-header__title">⏰ Reminders & Schedule</h1>
            <p className="page-header__subtitle">Never miss a study session</p>
          </div>
          <button className="btn btn--primary" onClick={() => setShowModal(true)}>
            + New Reminder
          </button>
        </div>
      </div>

      <div className="page-body">
        {/* Built-in reminders */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--text-secondary)' }}>
            🔔 Built-in Reminders (Always Active)
          </h3>
          <div className="reminder-card">
            <div className="reminder-card__icon">🌅</div>
            <div className="reminder-card__info">
              <div className="reminder-card__title">Morning Motivation</div>
              <div className="reminder-card__schedule">Every day at 9:00 AM</div>
            </div>
            <span className="badge badge--easy">Active</span>
          </div>
          <div className="reminder-card">
            <div className="reminder-card__icon">⚠️</div>
            <div className="reminder-card__info">
              <div className="reminder-card__title">Evening Streak Check</div>
              <div className="reminder-card__schedule">Every day at 8:00 PM — only if daily goal not met</div>
            </div>
            <span className="badge badge--easy">Active</span>
          </div>
          <div className="reminder-card">
            <div className="reminder-card__icon">📋</div>
            <div className="reminder-card__info">
              <div className="reminder-card__title">Weekly Topic Review</div>
              <div className="reminder-card__schedule">Every Sunday at 10:00 AM — alerts on stale topics</div>
            </div>
            <span className="badge badge--easy">Active</span>
          </div>
        </div>

        {/* Custom reminders */}
        <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--text-secondary)' }}>
          ✨ Your Custom Reminders
        </h3>

        {reminders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">⏰</div>
            <div className="empty-state__title">No custom reminders yet</div>
            <div className="empty-state__desc">Create reminders to stay on track with your preparation goals.</div>
            <button className="btn btn--primary" onClick={() => setShowModal(true)}>+ Create First Reminder</button>
          </div>
        ) : (
          reminders.map(r => (
            <div className="reminder-card" key={r.id}>
              <div className="reminder-card__icon">{r.cron_expression ? '🔄' : '📌'}</div>
              <div className="reminder-card__info">
                <div className="reminder-card__title">{r.title}</div>
                <div className="reminder-card__schedule">
                  {r.cron_expression ? describeCron(r.cron_expression) : `One-time: ${new Date(r.one_time_date).toLocaleString()}`}
                  {r.description && <span style={{ color: 'var(--text-tertiary)' }}> — {r.description}</span>}
                </div>
              </div>
              <button
                className={`reminder-card__toggle ${r.is_active ? 'reminder-card__toggle--active' : ''}`}
                onClick={() => toggleReminder(r.id, r.is_active)}
              />
              <button className="btn btn--ghost btn--sm" onClick={() => deleteReminder(r.id)} style={{ color: 'var(--accent-red)' }}>
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal__title">Create Reminder</div>

            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                className="form-input"
                placeholder="e.g., Solve 3 LeetCode problems"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description (optional)</label>
              <input
                className="form-input"
                placeholder="Additional details..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Type</label>
              <div className="tabs">
                <button className={`tab ${form.type === 'recurring' ? 'tab--active' : ''}`} onClick={() => setForm({ ...form, type: 'recurring' })}>
                  🔄 Recurring
                </button>
                <button className={`tab ${form.type === 'one_time' ? 'tab--active' : ''}`} onClick={() => setForm({ ...form, type: 'one_time' })}>
                  📌 One-time
                </button>
              </div>
            </div>

            {form.type === 'recurring' ? (
              <div className="form-group">
                <label className="form-label">Schedule</label>
                <select
                  className="form-input form-select"
                  value={form.cron_expression}
                  onChange={e => setForm({ ...form, cron_expression: e.target.value })}
                >
                  {CRON_PRESETS.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
                {form.cron_expression === '' && (
                  <input
                    className="form-input"
                    placeholder="Enter cron expression (e.g., 0 9 * * 1-5)"
                    style={{ marginTop: 'var(--space-2)' }}
                    onChange={e => setForm({ ...form, cron_expression: e.target.value })}
                  />
                )}
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={form.one_time_date || ''}
                  onChange={e => setForm({ ...form, one_time_date: e.target.value })}
                />
              </div>
            )}

            <div className="modal__actions">
              <button className="btn btn--secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="btn btn--primary"
                onClick={createReminder}
                disabled={!form.title}
              >
                Create Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
