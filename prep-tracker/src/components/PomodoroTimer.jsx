import React, { useState, useEffect, useRef } from 'react';

export default function PomodoroTimer() {
  const [mode, setMode] = useState('work'); // 'work' | 'break' | 'longbreak'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  const durations = { work: 25 * 60, break: 5 * 60, longbreak: 15 * 60 };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  function handleComplete() {
    setIsRunning(false);
    if (mode === 'work') {
      setSessions(s => s + 1);
      // Play notification sound
      try { new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH+Jk5WHa1Zhc4GNmZqTf2xjdIGNm5qWjXlsZXeBjpmYk4Z2bGd1gIqUkoN3b2xzfIeRj4N6cm5ze4WMjIF5c3B0eoOIiIB6dXN2eYGFhoB8eXd3eX6CgoB8eXh5en6Ag4J/fHp5eXx+gIGBf3x7enp7fX+AgH99fHt7fH1+f4B/fn18fHx8fX5/f359fX19fX1+fn9/fn5+fn5+fn5+fn9/f39/f39/f39/f39/f39/f39/f39/f39/fw==').play(); } catch {}
      const nextMode = (sessions + 1) % 4 === 0 ? 'longbreak' : 'break';
      setMode(nextMode);
      setTimeLeft(durations[nextMode]);
    } else {
      setMode('work');
      setTimeLeft(durations.work);
    }
  }

  function toggleTimer() {
    setIsRunning(!isRunning);
  }

  function resetTimer() {
    setIsRunning(false);
    setTimeLeft(durations[mode]);
  }

  function switchMode(newMode) {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(durations[newMode]);
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((durations[mode] - timeLeft) / durations[mode]) * 100;

  const modeLabels = { work: 'Focus Time', break: 'Short Break', longbreak: 'Long Break' };
  const modeEmojis = { work: '🎯', break: '☕', longbreak: '🧘' };

  return (
    <div className="pomodoro">
      <div className="tabs" style={{ margin: '0 auto var(--space-6)', justifyContent: 'center' }}>
        <button className={`tab ${mode === 'work' ? 'tab--active' : ''}`} onClick={() => switchMode('work')}>🎯 Focus</button>
        <button className={`tab ${mode === 'break' ? 'tab--active' : ''}`} onClick={() => switchMode('break')}>☕ Break</button>
        <button className={`tab ${mode === 'longbreak' ? 'tab--active' : ''}`} onClick={() => switchMode('longbreak')}>🧘 Long Break</button>
      </div>

      <div className={`pomodoro__circle ${isRunning ? 'pomodoro__circle--active' : ''}`}>
        <svg width="200" height="200" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
          <circle cx="100" cy="100" r="90" fill="none" stroke="var(--bg-tertiary)" strokeWidth="6" />
          <circle
            cx="100" cy="100" r="90" fill="none"
            stroke={mode === 'work' ? 'var(--accent-blue)' : 'var(--accent-green)'}
            strokeWidth="6" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 90}
            strokeDashoffset={2 * Math.PI * 90 * (1 - progress / 100)}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div>
          <div style={{ fontSize: '14px', marginBottom: '4px' }}>{modeEmojis[mode]}</div>
          <div className="pomodoro__time">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="pomodoro__label">{modeLabels[mode]}</div>

      <div className="pomodoro__controls">
        <button className={`btn ${isRunning ? 'btn--danger' : 'btn--primary'} btn--lg`} onClick={toggleTimer}>
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        <button className="btn btn--secondary btn--lg" onClick={resetTimer}>↺ Reset</button>
      </div>

      <div style={{ marginTop: 'var(--space-6)', color: 'var(--text-secondary)', fontSize: '13px' }}>
        Sessions completed: <strong>{sessions}</strong>
      </div>
    </div>
  );
}
