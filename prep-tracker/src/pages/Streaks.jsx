import React, { useState, useEffect } from 'react';
import { API_BASE } from '../utils/helpers';
import StreakCounter from '../components/StreakCounter';
import HeatmapCalendar from '../components/HeatmapCalendar';
import { useGamification } from '../utils/GamificationContext';

export default function Streaks() {
  const {
    xp,
    level,
    currentSuit,
    SUIT_TIERS,
    unlockedBadges,
    ALL_BADGES,
    dailyQuests,
    completeDailyQuest,
    levelProgressPercent,
  } = useGamification();

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
        <h1 className="page-header__title">🔥 Streaks, Daily Quests & Iron Man Suit Tiers</h1>
        <p className="page-header__subtitle">
          Level {level} • {currentSuit.name} • {xp} Total XP earned
        </p>
      </div>

      <div className="page-body">
        {/* Daily Quests Board */}
        <div className="chart-card" style={{ marginBottom: 'var(--space-5)', border: '1.5px solid rgba(56, 189, 248, 0.3)' }}>
          <div className="chart-card__header">
            <div className="chart-card__title">🎯 Daily Protocol Quests (Resets Every 24h)</div>
            <span className="badge badge--easy">+{dailyQuests.reduce((a, b) => a + b.xpReward, 0)} XP Available Today</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '14px' }}>
            {dailyQuests.map((quest) => (
              <div
                key={quest.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: quest.completed ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-secondary)',
                  border: `1px solid ${quest.completed ? '#10B981' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{quest.icon}</span>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, textDecoration: quest.completed ? 'line-through' : 'none', color: quest.completed ? 'var(--text-tertiary)' : 'var(--text-primary)' }}>
                      {quest.text}
                    </div>
                    <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 800, marginTop: '2px' }}>
                      +{quest.xpReward} XP Reward
                    </div>
                  </div>
                </div>

                <button
                  className={`btn btn--sm ${quest.completed ? 'btn--ghost' : 'btn--primary'}`}
                  disabled={quest.completed}
                  onClick={() => completeDailyQuest(quest.id)}
                  style={{ minWidth: '90px' }}
                >
                  {quest.completed ? '✓ Done' : 'Claim'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Iron Man Suit Tier Roadmap */}
        <div className="chart-card" style={{ marginBottom: 'var(--space-5)' }}>
          <div className="chart-card__header">
            <div className="chart-card__title">🛡️ Suit Tier Evolution Protocol</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '14px' }}>
            {SUIT_TIERS.map((tier) => {
              const isCurrent = currentSuit.tier === tier.tier;
              const isUnlocked = level >= tier.minLevel;
              return (
                <div
                  key={tier.tier}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius)',
                    background: isCurrent ? 'rgba(56, 189, 248, 0.12)' : 'var(--bg-secondary)',
                    border: `1.5px solid ${isCurrent ? tier.color : isUnlocked ? 'var(--border-color)' : 'rgba(255, 255, 255, 0.05)'}`,
                    opacity: isUnlocked ? 1 : 0.45,
                    position: 'relative',
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{tier.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: tier.color }}>{tier.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                    Levels {tier.minLevel} - {tier.maxLevel === 999 ? '∞' : tier.maxLevel}
                  </div>
                  {isCurrent && (
                    <span style={{
                      position: 'absolute', top: '10px', right: '10px',
                      fontSize: '9px', fontWeight: 900, background: tier.color, color: '#0F172A',
                      padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase'
                    }}>
                      ACTIVE
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Streak Counter */}
        <div className="chart-card">
          <StreakCounter
            current={streaks.currentStreak}
            longest={streaks.longestStreak}
            goal={streaks.goalProblems}
          />
        </div>

        {/* Badges Showcase */}
        <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-card__header">
            <div className="chart-card__title">🏆 Hall of Achievements ({unlockedBadges.length}/{ALL_BADGES.length} Unlocked)</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginTop: '14px' }}>
            {ALL_BADGES.map((badge) => {
              const isUnlocked = unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius)',
                    background: isUnlocked ? 'var(--bg-card)' : 'rgba(0, 0, 0, 0.2)',
                    border: `1px solid ${isUnlocked ? 'rgba(56, 189, 248, 0.4)' : 'var(--border-color)'}`,
                    opacity: isUnlocked ? 1 : 0.4,
                  }}
                >
                  <div style={{ fontSize: '32px', filter: isUnlocked ? 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.4))' : 'grayscale(1)' }}>
                    {badge.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 800, color: isUnlocked ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                        {badge.name}
                      </span>
                      <span className="badge" style={{ fontSize: '9px', background: isUnlocked ? 'rgba(139, 92, 246, 0.2)' : 'var(--bg-tertiary)', color: isUnlocked ? '#C084FC' : 'var(--text-tertiary)' }}>
                        {badge.rarity}
                      </span>
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                      {badge.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
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
      </div>
    </div>
  );
}

