import React, { useState, useEffect } from 'react';
import { API_BASE } from '../utils/helpers';
import StreakCounter from '../components/StreakCounter';
import HeatmapCalendar from '../components/HeatmapCalendar';

export default function Streaks() {
  const [streaks, setStreaks] = useState({ currentStreak: 0, longestStreak: 0, goalProblems: 3 });
  const [heatmapData, setHeatmapData] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/streaks`).then(r => r.json()),
      fetch(`${API_BASE}/api/daily-logs?days=365`).then(r => r.json()),
    ])
      .then(([st, logs]) => {
        setStreaks(st);
        const map = {};
        logs.forEach(l => { map[l.date] = l.problems_solved; });
        setHeatmapData(map);

        // Build weekly consistency data (last 12 weeks)
        const weeks = [];
        const today = new Date();
        for (let w = 0; w < 12; w++) {
          let daysActive = 0;
          for (let d = 0; d < 7; d++) {
            const date = new Date(today);
            date.setDate(date.getDate() - (w * 7 + d));
            const dateStr = date.toISOString().split('T')[0];
            if (map[dateStr] && map[dateStr] >= (st.goalProblems || 1)) daysActive++;
          }
          weeks.unshift({ week: `W${12 - w}`, daysActive, consistency: Math.round((daysActive / 7) * 100) });
        }
        setWeeklyData(weeks);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-header__title">🔥 Streak & Discipline</h1>
        <p className="page-header__subtitle">Consistency is the key to mastery</p>
      </div>

      <div className="page-body">
        {/* Main Streak Counter */}
        <div className="chart-card">
          <StreakCounter
            current={streaks.currentStreak}
            longest={streaks.longestStreak}
            goal={streaks.goalProblems}
          />
        </div>

        {/* Weekly Consistency */}
        <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-card__header">
            <div className="chart-card__title">📊 Weekly Consistency (Last 12 Weeks)</div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
            {weeklyData.map((w, i) => (
              <div key={i} style={{
                flex: '1 1 70px',
                textAlign: 'center',
                padding: 'var(--space-3)',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius)',
                minWidth: '70px',
              }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>{w.week}</div>
                <div style={{
                  fontSize: '18px', fontWeight: 800,
                  color: w.consistency >= 80 ? 'var(--accent-green)' : w.consistency >= 50 ? 'var(--accent-orange)' : 'var(--accent-red)',
                }}>
                  {w.consistency}%
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{w.daysActive}/7 days</div>
                <div style={{
                  height: '4px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)',
                  marginTop: '6px', overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', width: `${w.consistency}%`,
                    background: w.consistency >= 80 ? 'var(--accent-green)' : w.consistency >= 50 ? 'var(--accent-orange)' : 'var(--accent-red)',
                    borderRadius: 'var(--radius-full)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-card__header">
            <div className="chart-card__title">📅 Activity Calendar</div>
          </div>
          <HeatmapCalendar data={heatmapData} />
        </div>

        {/* Streak Tips */}
        <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-card__header">
            <div className="chart-card__title">💡 Streak Tips</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
            {[
              { emoji: '🌅', title: 'Start Early', desc: 'Solve at least 1 problem before lunch to secure your streak.' },
              { emoji: '📱', title: 'Set Reminders', desc: 'Use the Reminders page to set daily alerts at your preferred time.' },
              { emoji: '🎯', title: 'Easy First', desc: 'On low-energy days, solve an easy problem to maintain the streak.' },
              { emoji: '📝', title: 'Review Often', desc: 'Revisit solved problems weekly to reinforce your understanding.' },
            ].map((tip, i) => (
              <div key={i} style={{
                padding: 'var(--space-4)', background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius)', display: 'flex', gap: 'var(--space-3)',
              }}>
                <span style={{ fontSize: '28px' }}>{tip.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>{tip.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{tip.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
