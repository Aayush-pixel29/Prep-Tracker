import React from 'react';

export default function HeatmapCalendar({ data = {}, year }) {
  const currentYear = year || new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Build weeks array
  const weeks = [];
  let currentWeek = [];

  // Pad first week with empty cells
  const firstDay = startDate.getDay();
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push(null);
  }

  // Fill in all days
  const endDate = new Date(currentYear, 11, 31);
  const iterDate = new Date(startDate);

  while (iterDate <= endDate && iterDate <= today) {
    const dateStr = iterDate.toISOString().split('T')[0];
    const count = data[dateStr] || 0;
    currentWeek.push({ date: dateStr, count });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    iterDate.setDate(iterDate.getDate() + 1);
  }

  // Push remaining days
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  function getLevel(count) {
    if (count === 0) return 0;
    if (count <= 1) return 1;
    if (count <= 3) return 2;
    if (count <= 5) return 3;
    return 4;
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div>
      <div style={{ display: 'flex', gap: '28px', marginBottom: '8px', paddingLeft: '2px' }}>
        {months.map((m, i) => (
          <span key={i} style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 500, minWidth: '24px' }}>{m}</span>
        ))}
      </div>
      <div className="heatmap">
        {weeks.map((week, wi) => (
          <div className="heatmap__week" key={wi}>
            {week.map((day, di) =>
              day ? (
                <div
                  key={di}
                  className={`heatmap__cell heatmap__cell--${getLevel(day.count)}`}
                  data-tooltip={`${day.date}: ${day.count} problems`}
                />
              ) : (
                <div key={di} style={{ width: 14, height: 14 }} />
              )
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginRight: '4px' }}>Less</span>
        {[0, 1, 2, 3, 4].map(level => (
          <div key={level} className={`heatmap__cell heatmap__cell--${level}`} style={{ cursor: 'default' }} />
        ))}
        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginLeft: '4px' }}>More</span>
      </div>
    </div>
  );
}
