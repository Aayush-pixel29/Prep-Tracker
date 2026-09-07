import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { API_BASE } from '../utils/helpers';
import { useRole } from '../utils/RoleContext';
import { useGamification } from '../utils/GamificationContext';

const navItems = [
  { path: '/', icon: '🏠', label: 'Dashboard', section: 'overview' },
  { path: '/journey', icon: '🎯', label: 'Role Journey', section: 'overview' },
  { path: '/statistics', icon: '📊', label: 'Statistics', section: 'overview' },

  { path: '/roadmap', icon: '🗺️', label: 'Topic Roadmap', section: 'dsa' },
  { path: '/practice-arena', icon: '⚡', label: 'Practice Arena', section: 'dsa' },
  { path: '/streaks', icon: '🔥', label: 'Streaks & Quests', section: 'dsa' },

  { path: '/tech-radar', icon: '📡', label: 'Tech Radar 2026', section: 'mastery' },
  { path: '/senior-mindset', icon: '🧠', label: 'Senior Mindset', section: 'mastery' },
  { path: '/interview-prep', icon: '🎤', label: 'Interview Prep', section: 'mastery' },

  { path: '/reminders', icon: '⏰', label: 'Reminders', section: 'tools' },
  { path: '/log', icon: '📝', label: 'Manual Log', section: 'tools' },
  { path: '/reports', icon: '📈', label: 'Reports', section: 'tools' },
];

export default function Sidebar({ onOpenFocus }) {
  const location = useLocation();
  const { roleData, switchRole, preferredLanguage, changeLanguage, SUPPORTED_LANGUAGES } = useRole();
  const { level, xp, currentSuit, levelProgressPercent, nextLevelXp, dailyQuests } = useGamification();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/api/streaks`)
      .then(r => r.json())
      .then(data => setStreak(data.currentStreak))
      .catch(() => {});
  }, [location.pathname]);

  const sections = {
    overview: 'Overview',
    dsa: 'DSA & Coding',
    mastery: 'Staff & Market Intel',
    tools: 'Workspace Tools',
  };

  const groupedNav = {};
  navItems.forEach(item => {
    if (!groupedNav[item.section]) groupedNav[item.section] = [];
    groupedNav[item.section].push(item);
  });

  const completedQuests = dailyQuests.filter(q => q.completed).length;

  return (
    <aside className="sidebar">
      {/* Iron Man HUD / Profile */}
      <div className="sidebar__profile">
        <div className="sidebar__avatar-row">
          <div className="sidebar__avatar">A</div>
          <div className="sidebar__suit-badge" style={{ borderColor: currentSuit?.color, color: currentSuit?.color }}>
            <span>{currentSuit?.icon}</span>
            <span className="sidebar__suit-level">Lv {level}</span>
          </div>
        </div>

        <div className="sidebar__name">Aayush</div>
        <div className="sidebar__suit-name" style={{ color: currentSuit?.color }}>
          {currentSuit?.name}
        </div>

        {/* XP Progress Bar */}
        <div className="sidebar__xp-card">
          <div className="sidebar__xp-header">
            <span className="sidebar__xp-text">⚡ {xp} Total XP</span>
            <span className="sidebar__xp-next">{levelProgressPercent}%</span>
          </div>
          <div className="sidebar__xp-bar-bg">
            <div
              className="sidebar__xp-bar-fill"
              style={{
                width: `${levelProgressPercent}%`,
                background: currentSuit?.color || 'var(--accent-blue)',
              }}
            />
          </div>
        </div>

        {roleData && (
          <div className="sidebar__role-badge" style={{ background: roleData.gradient }}>
            {roleData.icon} {roleData.name}
          </div>
        )}

        <button className="sidebar__switch-role" onClick={switchRole} title="Switch career role">
          🔄 Switch Role
        </button>

        {/* Deep Work Focus Mode Launcher */}
        <button
          className="sidebar__focus-btn"
          onClick={onOpenFocus}
          title="Engage Deep Work Flow State with Neural Audio"
        >
          <span>🧘 Engage Deep Work</span>
          <span className="sidebar__focus-xp">+75 XP</span>
        </button>

        {/* Quick Language Switcher */}
        <div className="sidebar__lang-selector">
          <div className="sidebar__lang-header">
            <span className="sidebar__lang-title">Active Language:</span>
          </div>
          <div className="sidebar__lang-grid">
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.key}
                className={`sidebar__lang-pill ${preferredLanguage === lang.key ? 'sidebar__lang-pill--active' : ''}`}
                onClick={() => changeLanguage(lang.key)}
                title={`Switch practice language to ${lang.name}`}
              >
                <span>{lang.icon}</span>
                <span className="sidebar__lang-pill-text">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="sidebar__nav">
        {Object.entries(groupedNav).map(([section, items]) => (
          <div key={section}>
            <div className="sidebar__section-title">{sections[section]}</div>
            {items.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                }
                end={item.path === '/'}
              >
                <span className="sidebar__icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom Streaks & Daily Quests Card */}
      <div className="sidebar__footer-cards">
        <div className="streak-mini-card">
          <div className="streak-mini-card__number">{streak}</div>
          <div className="streak-mini-card__label">Day Streak 🔥</div>
        </div>

        <div className="quests-mini-card" title="Daily Quests Progress">
          <div className="quests-mini-card__number">{completedQuests}/{dailyQuests.length}</div>
          <div className="quests-mini-card__label">Quests Done 🎯</div>
        </div>
      </div>
    </aside>
  );
}

