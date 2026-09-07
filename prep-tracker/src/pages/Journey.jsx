import React, { useState, useEffect, useMemo } from 'react';
import { useRole } from '../utils/RoleContext';
import { API_BASE } from '../utils/helpers';
import ProgressRing from '../components/ProgressRing';

export default function Journey() {
  const { activeRole, roleData } = useRole();
  const [progress, setProgress] = useState({});
  const [streaks, setStreaks] = useState({ currentStreak: 0, longestStreak: 0, totalStudyHours: 0 });

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/roadmap`).then(r => r.json()),
      fetch(`${API_BASE}/api/streaks`).then(r => r.json()),
    ])
      .then(([roadmapData, streakData]) => {
        const map = {};
        roadmapData.forEach(item => { map[`${item.pillar}|${item.topic}`] = item.status; });
        setProgress(map);
        setStreaks(streakData);
      })
      .catch(() => {});
  }, [activeRole]);

  function getStatus(sectionId, topicName) {
    return progress[`${activeRole}:${sectionId}|${topicName}`] || 'not_started';
  }

  // Calculate phase-level stats
  const phaseStats = useMemo(() => {
    if (!roleData) return [];
    return roleData.phases.map(phase => {
      let total = 0, completed = 0, inProgress = 0;
      phase.sections.forEach(section => {
        section.topics.forEach(t => {
          total++;
          const s = getStatus(section.id, t.name);
          if (s === 'completed') completed++;
          else if (s === 'in_progress' || s === 'practiced') inProgress++;
        });
      });
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { ...phase, total, completed, inProgress, percent };
    });
  }, [roleData, progress, activeRole]);

  // Overall stats
  const overallStats = useMemo(() => {
    const totalTopics = phaseStats.reduce((sum, p) => sum + p.total, 0);
    const completedTopics = phaseStats.reduce((sum, p) => sum + p.completed, 0);
    const overallPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    // Estimate days remaining
    const avgTopicsPerDay = streaks.currentStreak > 0 ? completedTopics / Math.max(streaks.currentStreak, 1) : 2;
    const remainingTopics = totalTopics - completedTopics;
    const estimatedDays = avgTopicsPerDay > 0 ? Math.ceil(remainingTopics / avgTopicsPerDay) : '??';

    // Current phase
    let currentPhaseIdx = 0;
    for (let i = 0; i < phaseStats.length; i++) {
      if (phaseStats[i].percent < 100) {
        currentPhaseIdx = i;
        break;
      }
      if (i === phaseStats.length - 1) currentPhaseIdx = i;
    }

    return { totalTopics, completedTopics, overallPercent, estimatedDays, currentPhaseIdx, avgTopicsPerDay: avgTopicsPerDay.toFixed(1) };
  }, [phaseStats, streaks]);

  if (!roleData) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">🗺️</div>
        <div className="empty-state__title">No role selected</div>
        <div className="empty-state__desc">Select a role to see your journey.</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-header__title">🎯 My Journey — {roleData.name}</h1>
        <p className="page-header__subtitle">Your learning journey at a glance</p>
      </div>

      <div className="page-body">
        {/* Overview Cards */}
        <div className="journey-overview">
          <div className="journey-stat-card" style={{ background: roleData.gradient }}>
            <div className="journey-stat-card__value">{overallStats.overallPercent}%</div>
            <div className="journey-stat-card__label">Overall Progress</div>
          </div>
          <div className="journey-stat-card">
            <div className="journey-stat-card__value">{overallStats.completedTopics}</div>
            <div className="journey-stat-card__label">Topics Mastered</div>
          </div>
          <div className="journey-stat-card">
            <div className="journey-stat-card__value">{overallStats.totalTopics - overallStats.completedTopics}</div>
            <div className="journey-stat-card__label">Remaining</div>
          </div>
          <div className="journey-stat-card">
            <div className="journey-stat-card__value">{overallStats.estimatedDays}d</div>
            <div className="journey-stat-card__label">Est. Days Left</div>
          </div>
          <div className="journey-stat-card">
            <div className="journey-stat-card__value">{streaks.currentStreak}🔥</div>
            <div className="journey-stat-card__label">Current Streak</div>
          </div>
          <div className="journey-stat-card">
            <div className="journey-stat-card__value">{overallStats.avgTopicsPerDay}</div>
            <div className="journey-stat-card__label">Topics/Day Avg</div>
          </div>
        </div>

        {/* Study Flow Guide */}
        <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-card__header">
            <div className="chart-card__title">📖 Your Daily Study Flow</div>
          </div>
          <div className="study-flow">
            {[
              { icon: '📹', title: 'Watch', desc: 'Find & watch video explanations', status: 'in_progress' },
              { icon: '📖', title: 'Read', desc: 'Study theory & key concepts', status: 'in_progress' },
              { icon: '💻', title: 'Code', desc: 'Solve problems on LeetCode', status: 'practiced' },
              { icon: '🔄', title: 'Review', desc: 'Revisit after 2-3 days', status: 'completed' },
              { icon: '✅', title: 'Master', desc: 'Mark as mastered when confident', status: 'completed' },
            ].map((step, i) => (
              <React.Fragment key={i}>
                <div className="study-flow__step">
                  <div className="study-flow__icon">{step.icon}</div>
                  <div className="study-flow__title">{step.title}</div>
                  <div className="study-flow__desc">{step.desc}</div>
                </div>
                {i < 4 && <div className="study-flow__arrow">→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Phase Timeline */}
        <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-card__header">
            <div className="chart-card__title">🗺️ Phase Timeline</div>
          </div>
          <div className="phase-timeline">
            {phaseStats.map((phase, idx) => {
              const isCurrent = idx === overallStats.currentPhaseIdx;
              const isCompleted = phase.percent === 100;
              const isPast = idx < overallStats.currentPhaseIdx;

              return (
                <div key={phase.id} className={`phase-timeline__item ${isCurrent ? 'phase-timeline__item--current' : ''} ${isCompleted ? 'phase-timeline__item--done' : ''}`}>
                  <div className="phase-timeline__connector">
                    <div className={`phase-timeline__dot ${isCompleted ? 'phase-timeline__dot--done' : isCurrent ? 'phase-timeline__dot--current' : ''}`}>
                      {isCompleted ? '✓' : phase.icon}
                    </div>
                    {idx < phaseStats.length - 1 && (
                      <div className={`phase-timeline__line ${isCompleted || isPast ? 'phase-timeline__line--done' : ''}`} />
                    )}
                  </div>

                  <div className="phase-timeline__content">
                    <div className="phase-timeline__header">
                      <div className="phase-timeline__name">{phase.name}</div>
                      <div className="phase-timeline__duration">{phase.duration}</div>
                    </div>
                    <div className="phase-timeline__desc">{phase.description}</div>

                    <div className="phase-timeline__progress">
                      <div className="phase-timeline__bar">
                        <div className="phase-timeline__bar-fill" style={{ width: `${phase.percent}%`, background: isCompleted ? 'var(--accent-green)' : roleData.gradient }} />
                      </div>
                      <span className="phase-timeline__stats">
                        {phase.completed}/{phase.total} topics ({phase.percent}%)
                        {phase.inProgress > 0 && ` • ${phase.inProgress} in progress`}
                      </span>
                    </div>

                    {/* Sections in this phase */}
                    <div className="phase-timeline__sections">
                      {phase.sections.map(section => {
                        let secTotal = 0, secDone = 0;
                        section.topics.forEach(t => {
                          secTotal++;
                          if (getStatus(section.id, t.name) === 'completed') secDone++;
                        });
                        const secPct = secTotal > 0 ? Math.round((secDone / secTotal) * 100) : 0;
                        return (
                          <div key={section.id} className="phase-timeline__section">
                            <span>{section.icon} {section.name}</span>
                            <span className="phase-timeline__section-stat">{secDone}/{secTotal}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consistency Insight */}
        <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-card__header">
            <div className="chart-card__title">💡 Consistency Insights</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
            {[
              { emoji: '🎯', title: 'Pace Check', desc: overallStats.avgTopicsPerDay >= 2 ? `You're averaging ${overallStats.avgTopicsPerDay} topics/day. Great pace!` : `Try to complete at least 2 topics per day to stay on track.` },
              { emoji: '📅', title: 'Estimated Completion', desc: `At your current pace, you'll finish in ~${overallStats.estimatedDays} days.` },
              { emoji: '🔥', title: 'Streak Status', desc: streaks.currentStreak >= 7 ? `${streaks.currentStreak}-day streak! 🎉 Keep it going!` : `Build your streak! Aim for 7 consecutive days.` },
              { emoji: '📊', title: 'Study Hours', desc: `You've logged ${streaks.totalStudyHours || 0} study hours total. Consistency beats intensity!` },
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
