import React from 'react';

export default function StreakCounter({ current = 0, longest = 0, goal = 3 }) {
  const milestones = [7, 14, 30, 60, 100, 200, 365];
  const nextMilestone = milestones.find(m => m > current) || current + 50;
  const progressToNext = Math.min((current / nextMilestone) * 100, 100);

  return (
    <div className="streak-counter animate-scale-in">
      <div className="streak-counter__fire">🔥</div>
      <div className="streak-counter__number">{current}</div>
      <div className="streak-counter__label">Day Streak</div>

      <div style={{
        marginTop: 'var(--space-6)',
        display: 'flex',
        gap: 'var(--space-8)',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-purple)' }}>{longest}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Longest Streak</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-blue)' }}>{goal}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Daily Goal</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-green)' }}>{nextMilestone}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Next Milestone</div>
        </div>
      </div>

      {/* Progress to next milestone */}
      <div style={{ marginTop: 'var(--space-6)', maxWidth: '360px', margin: 'var(--space-6) auto 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Progress to {nextMilestone} days</span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-orange)' }}>{Math.round(progressToNext)}%</span>
        </div>
        <div style={{
          height: '8px',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progressToNext}%`,
            background: 'var(--gradient-warm)',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.5s ease-out',
          }} />
        </div>
      </div>

      {/* Milestone badges */}
      <div style={{
        marginTop: 'var(--space-8)',
        display: 'flex',
        gap: 'var(--space-3)',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {milestones.map(m => (
          <div key={m} style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: current >= m ? 'var(--gradient-primary)' : 'var(--bg-tertiary)',
            color: current >= m ? 'white' : 'var(--text-tertiary)',
            fontSize: '11px',
            fontWeight: 700,
            transition: 'all 0.3s ease',
            boxShadow: current >= m ? 'var(--shadow-glow-blue)' : 'none',
          }}>
            <span style={{ fontSize: '16px' }}>{current >= m ? '🏆' : '🔒'}</span>
            <span>{m}d</span>
          </div>
        ))}
      </div>
    </div>
  );
}
