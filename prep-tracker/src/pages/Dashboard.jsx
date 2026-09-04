import React, { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import ProgressRing from '../components/ProgressRing';
import HeatmapCalendar from '../components/HeatmapCalendar';
import PomodoroTimer from '../components/PomodoroTimer';
import { API_BASE, getTodaysQuote, formatTime, PILLAR_NAMES, PILLAR_ICONS } from '../utils/helpers';

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [streaks, setStreaks] = useState(null);
  const [heatmapData, setHeatmapData] = useState({});
  const [recentProblems, setRecentProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const quote = getTodaysQuote();

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/stats/overview`).then(r => r.json()),
      fetch(`${API_BASE}/api/streaks`).then(r => r.json()),
      fetch(`${API_BASE}/api/daily-logs?days=365`).then(r => r.json()),
      fetch(`${API_BASE}/api/problems?limit=5`).then(r => r.json()),
    ])
      .then(([ov, st, logs, probs]) => {
        setOverview(ov);
        setStreaks(st);
        setRecentProblems(probs);

        // Build heatmap data
        const map = {};
        logs.forEach(l => { map[l.date] = l.problems_solved; });
        setHeatmapData(map);
        setLoading(false);
      })
      .catch(() => {
        // Set defaults for when API isn't ready
        setOverview({
          today: { problems_solved: 0, study_minutes: 0 },
          weekProblems: 0, monthProblems: 0, totalProblems: 0,
          weekStudyHours: 0, monthStudyHours: 0,
          byDifficulty: [], byPlatform: [], byCategory: [],
          weeklyTrend: [], monthlyTrend: [],
        });
        setStreaks({ currentStreak: 0, longestStreak: 0, totalProblems: 0, totalStudyHours: 0, goalProblems: 3 });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">⏳</div>
        <div className="empty-state__title">Loading your dashboard...</div>
      </div>
    );
  }

  const weekGoal = (streaks?.goalProblems || 3) * 7;
  const weekProgress = Math.min(((overview?.weekProblems || 0) / weekGoal) * 100, 100);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-header__title">Good {getGreeting()}, Aayush! 👋</h1>
        <p className="page-header__subtitle">
          <em>"{quote.text}"</em> — {quote.author}
        </p>
      </div>

      <div className="page-body">
        {/* Quick Stats Row */}
        <div className="stats-grid">
          <StatsCard
            icon="🎯"
            label="Today's Problems"
            value={overview?.today?.problems_solved || 0}
            sub={`Goal: ${streaks?.goalProblems || 3}`}
            color="blue"
          />
          <StatsCard
            icon="⏱️"
            label="Study Today"
            value={formatTime(overview?.today?.study_minutes || 0)}
            sub="Keep pushing!"
            color="purple"
          />
          <StatsCard
            icon="🔥"
            label="Current Streak"
            value={`${streaks?.currentStreak || 0} days`}
            sub={`Best: ${streaks?.longestStreak || 0} days`}
            color="orange"
          />
          <StatsCard
            icon="📊"
            label="This Week"
            value={overview?.weekProblems || 0}
            sub={`${overview?.weekStudyHours || 0}h studied`}
            color="green"
          />
          <StatsCard
            icon="📅"
            label="This Month"
            value={overview?.monthProblems || 0}
            sub={`${overview?.monthStudyHours || 0}h studied`}
            color="cyan"
          />
          <StatsCard
            icon="🏆"
            label="Total Solved"
            value={overview?.totalProblems || 0}
            sub={`${streaks?.totalStudyHours || 0}h total`}
            color="purple"
          />
        </div>

        {/* Weekly Progress + Pomodoro Row */}
        <div className="chart-grid" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-card">
            <div className="chart-card__header">
              <div>
                <div className="chart-card__title">Weekly Goal Progress</div>
                <div className="chart-card__subtitle">{overview?.weekProblems || 0} / {weekGoal} problems this week</div>
              </div>
              <ProgressRing percent={weekProgress} size={80} strokeWidth={8} />
            </div>

            {/* Difficulty Breakdown */}
            <div style={{ marginTop: 'var(--space-4)' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: 'var(--space-3)' }}>By Difficulty</div>
              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                {['easy', 'medium', 'hard'].map(diff => {
                  const count = overview?.byDifficulty?.find(d => d.difficulty === diff)?.count || 0;
                  return (
                    <div key={diff} style={{ flex: 1, textAlign: 'center', padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' }}>
                      <span className={`badge badge--${diff}`}>{diff}</span>
                      <div style={{ fontSize: '22px', fontWeight: 800, marginTop: '4px' }}>{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Platform Breakdown */}
            {overview?.byPlatform?.length > 0 && (
              <div style={{ marginTop: 'var(--space-4)' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: 'var(--space-3)' }}>By Platform</div>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {overview.byPlatform.map(p => (
                    <span key={p.platform} className="badge badge--platform">{p.platform}: {p.count}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="chart-card">
            <div className="chart-card__header">
              <div className="chart-card__title">🍅 Pomodoro Timer</div>
            </div>
            <PomodoroTimer />
          </div>
        </div>

        {/* Contribution Heatmap */}
        <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-card__header">
            <div>
              <div className="chart-card__title">📅 Contribution Activity</div>
              <div className="chart-card__subtitle">{new Date().getFullYear()} activity heatmap</div>
            </div>
          </div>
          <HeatmapCalendar data={heatmapData} />
        </div>

        {/* Recent Activity */}
        <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-card__header">
            <div className="chart-card__title">🕐 Recent Activity</div>
          </div>
          {recentProblems.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Platform</th>
                    <th>Difficulty</th>
                    <th>Category</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProblems.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600 }}>{p.problem_name}</td>
                      <td><span className="badge badge--platform">{p.platform}</span></td>
                      <td><span className={`badge badge--${p.difficulty}`}>{p.difficulty}</span></td>
                      <td style={{ color: 'var(--text-secondary)' }}>{p.category}</td>
                      <td style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>{new Date(p.solved_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon">📝</div>
              <div className="empty-state__title">No problems logged yet</div>
              <div className="empty-state__desc">Start solving problems or connect the Chrome extension to auto-sync your progress!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}
