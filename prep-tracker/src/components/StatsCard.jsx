import React from 'react';

export default function StatsCard({ icon, label, value, sub, color = 'blue' }) {
  return (
    <div className="stat-card">
      <div className={`stat-card__icon stat-card__icon--${color}`}>
        {icon}
      </div>
      <div className="stat-card__info">
        <div className="stat-card__label">{label}</div>
        <div className="stat-card__value">{value}</div>
        {sub && <div className="stat-card__sub">{sub}</div>}
      </div>
    </div>
  );
}
