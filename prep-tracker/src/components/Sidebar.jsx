import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { API_BASE } from '../utils/helpers';

const navItems = [
  { path: '/', icon: '🏠', label: 'Dashboard', section: 'overview' },
  { path: '/statistics', icon: '📊', label: 'Statistics', section: 'overview' },
  { path: '/roadmap', icon: '🗺️', label: 'Roadmap', section: 'progress' },
  { path: '/streaks', icon: '🔥', label: 'Streaks', section: 'progress' },
  { path: '/reminders', icon: '⏰', label: 'Reminders', section: 'tools' },
  { path: '/log', icon: '📝', label: 'Manual Log', section: 'tools' },
  { path: '/reports', icon: '📈', label: 'Reports', section: 'tools' },
];

export default function Sidebar() {
  const location = useLocation();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/api/streaks`)
      .then(r => r.json())
      .then(data => setStreak(data.currentStreak))
      .catch(() => {});
  }, [location.pathname]);

  const sections = {
    overview: 'Overview',
    progress: 'Progress',
    tools: 'Tools',
  };

  const groupedNav = {};
  navItems.forEach(item => {
    if (!groupedNav[item.section]) groupedNav[item.section] = [];
    groupedNav[item.section].push(item);
  });

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__avatar">A</div>
        <div className="sidebar__name">Aayush</div>
        <div className="sidebar__role">AI/ML Engineer Prep</div>
      </div>

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

      <div className="sidebar__streak-badge">
        <div className="streak-mini-card">
          <div className="streak-mini-card__number">{streak}</div>
          <div className="streak-mini-card__label">Day Streak 🔥</div>
        </div>
      </div>
    </aside>
  );
}
