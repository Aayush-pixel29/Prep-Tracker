import React from 'react';

export default function ProgressRing({
  percent = 0,
  size = 120,
  strokeWidth = 10,
  color = 'var(--accent-blue)',
  label = 'Complete',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg className="progress-ring__svg" width={size} height={size}>
        <circle
          className="progress-ring__bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress-ring__fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="progress-ring__text">
        <span className="progress-ring__percent">{Math.round(percent)}%</span>
        <span className="progress-ring__label">{label}</span>
      </div>
    </div>
  );
}
