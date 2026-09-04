import React, { useState, useEffect } from 'react';
import { API_BASE, formatTime, PILLAR_NAMES } from '../utils/helpers';
import ProgressRing from '../components/ProgressRing';

export default function Reports() {
  const [overview, setOverview] = useState(null);
  const [streaks, setStreaks] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/stats/overview`).then(r => r.json()),
      fetch(`${API_BASE}/api/streaks`).then(r => r.json()),
      fetch(`${API_BASE}/api/roadmap`).then(r => r.json()),
    ])
      .then(([ov, st, rm]) => {
        setOverview(ov);
        setStreaks(st);
        setRoadmap(rm);
        setLoading(false);
      })
      .catch(() => {
        setOverview({ weekProblems: 0, monthProblems: 0, totalProblems: 0, weekStudyHours: 0, monthStudyHours: 0, byDifficulty: [], byPlatform: [], byCategory: [] });
        setStreaks({ currentStreak: 0, longestStreak: 0, totalProblems: 0, totalStudyHours: 0 });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="empty-state"><div className="empty-state__icon">⏳</div><div className="empty-state__title">Generating report...</div></div>;
  }

  const problems = period === 'week' ? overview?.weekProblems : overview?.monthProblems;
  const hours = period === 'week' ? overview?.weekStudyHours : overview?.monthStudyHours;

  // Calculate roadmap completion
  const completedTopics = roadmap.filter(r => r.status === 'completed').length;
  const inProgressTopics = roadmap.filter(r => r.status === 'in_progress').length;

  function exportData() {
    const data = { overview, streaks, roadmap, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `preptracker-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="page-header__title">📈 Reports</h1>
            <p className="page-header__subtitle">Overview of your preparation journey</p>
          </div>
          <button className="btn btn--primary" onClick={exportData}>📥 Export Data</button>
        </div>
      </div>

      <div className="page-body">
        {/* Period selector */}
        <div className="tabs" style={{ marginBottom: 'var(--space-5)' }}>
          <button className={`tab ${period === 'week' ? 'tab--active' : ''}`} onClick={() => setPeriod('week')}>Weekly Report</button>
          <button className={`tab ${period === 'month' ? 'tab--active' : ''}`} onClick={() => setPeriod('month')}>Monthly Report</button>
        </div>

        {/* Report Card */}
        <div className="chart-card">
          <div style={{ textAlign: 'center', padding: 'var(--space-6)' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
              {period === 'week' ? '📊 Weekly' : '📊 Monthly'} Prep Report
            </h2>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>
              Generated on {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)',
            padding: 'var(--space-5)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-6)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--accent-blue)' }}>{problems || 0}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Problems Solved</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--accent-purple)' }}>{hours || 0}h</div>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Study Hours</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--accent-orange)' }}>{streaks?.currentStreak || 0}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Current Streak</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--accent-green)' }}>{completedTopics}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Topics Completed</div>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: 'var(--space-3)' }}>Difficulty Breakdown</h3>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              {['easy', 'medium', 'hard'].map(diff => {
                const count = overview?.byDifficulty?.find(d => d.difficulty === diff)?.count || 0;
                const total = overview?.totalProblems || 1;
                const percent = Math.round((count / total) * 100);
                return (
                  <div key={diff} style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span className={`badge badge--${diff}`}>{diff}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700 }}>{count}</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)' }}>
                      <div style={{
                        height: '100%', width: `${percent}%`, borderRadius: 'var(--radius-full)',
                        background: diff === 'easy' ? 'var(--accent-green)' : diff === 'medium' ? 'var(--accent-orange)' : 'var(--accent-red)',
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Platform Breakdown */}
          {(overview?.byPlatform?.length || 0) > 0 && (
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: 'var(--space-3)' }}>Platform Activity</h3>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                {overview.byPlatform.map(p => (
                  <div key={p.platform} style={{
                    padding: 'var(--space-3) var(--space-5)', background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius)', textAlign: 'center', minWidth: '100px',
                  }}>
                    <div style={{ fontSize: '20px', fontWeight: 800 }}>{p.count}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{p.platform}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overall Stats */}
          <div style={{
            padding: 'var(--space-5)', background: 'var(--gradient-primary)',
            borderRadius: 'var(--radius-md)', color: 'white', textAlign: 'center',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: 'var(--space-3)' }}>🏆 All-Time Stats</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-8)' }}>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 900 }}>{overview?.totalProblems || 0}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Total Problems</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 900 }}>{streaks?.totalStudyHours || 0}h</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Total Study Hours</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 900 }}>{streaks?.longestStreak || 0}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Best Streak</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 900 }}>{completedTopics + inProgressTopics}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Topics Touched</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
