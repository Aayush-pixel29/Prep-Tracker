import React, { useState, useEffect, useRef } from 'react';
import { useGamification } from '../utils/GamificationContext';

export default function FocusTimer({ onClose }) {
  const { recordFocusSession, currentSuit } = useGamification();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'break'
  const [soundscape, setSoundscape] = useState('none'); // 'none' | 'binaural' | 'lofi' | 'engine'
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;
  const progressPercent = Math.round(((totalTime - timeLeft) / totalTime) * 100);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      stopAudio();
      if (mode === 'focus') {
        recordFocusSession(25);
        setSessionCompleted(true);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  // Audio synthesis for ambient focus soundscapes (Web Audio API)
  function startAudio(type) {
    stopAudio();
    if (type === 'none') return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.connect(ctx.destination);
      gainNodeRef.current = gain;

      if (type === 'binaural') {
        // 40Hz Gamma wave for high cognitive flow
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.connect(gain);
        osc.start();
        oscillatorRef.current = osc;
      } else if (type === 'engine' || type === 'lofi') {
        // Pink / Warm noise buffer
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          output[i] = (b0 + b1 + b2 + b3 + b4) * 0.11;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        whiteNoise.connect(gain);
        whiteNoise.start();
        oscillatorRef.current = whiteNoise;
      }
    } catch (e) {
      console.warn('Audio synthesis not supported', e);
    }
  }

  function stopAudio() {
    if (oscillatorRef.current) {
      try { oscillatorRef.current.stop(); } catch (e) {}
      oscillatorRef.current = null;
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch (e) {}
      audioCtxRef.current = null;
    }
  }

  function handleToggleTimer() {
    if (!isRunning && soundscape !== 'none') {
      startAudio(soundscape);
    } else if (isRunning) {
      stopAudio();
    }
    setIsRunning(!isRunning);
  }

  function handleReset(newMode = 'focus') {
    setIsRunning(false);
    stopAudio();
    setMode(newMode);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
    setSessionCompleted(false);
  }

  function handleSoundscapeChange(newSound) {
    setSoundscape(newSound);
    if (isRunning) {
      startAudio(newSound);
    }
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="focus-modal-overlay" onClick={onClose}>
      <div className="focus-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="focus-modal__header">
          <div className="focus-modal__title-box">
            <span className="focus-modal__icon">⚡</span>
            <div>
              <h3 className="focus-modal__title">Deep Work Studio</h3>
              <p className="focus-modal__subtitle">Jarvis Flow State Protocol • +75 XP Per Session</p>
            </div>
          </div>
          {onClose && <button className="focus-modal__close" onClick={onClose}>✕</button>}
        </div>

        {/* Mode Selector */}
        <div className="focus-modes">
          <button
            className={`focus-mode-btn ${mode === 'focus' ? 'focus-mode-btn--active' : ''}`}
            onClick={() => handleReset('focus')}
          >
            🎯 25m Focus Block
          </button>
          <button
            className={`focus-mode-btn ${mode === 'break' ? 'focus-mode-btn--active' : ''}`}
            onClick={() => handleReset('break')}
          >
            ☕ 5m Quick Recharge
          </button>
        </div>

        {/* Arc-Reactor Circular Timer */}
        <div className="arc-reactor-timer">
          <svg className="arc-reactor-svg" viewBox="0 0 200 200">
            <circle
              className="arc-reactor-bg"
              cx="100"
              cy="100"
              r="85"
            />
            <circle
              className="arc-reactor-progress"
              cx="100"
              cy="100"
              r="85"
              strokeDasharray={2 * Math.PI * 85}
              strokeDashoffset={2 * Math.PI * 85 * (1 - progressPercent / 100)}
              style={{ stroke: currentSuit?.color || 'var(--accent-blue)' }}
            />
          </svg>
          <div className="arc-reactor-core">
            <span className="arc-reactor-time">{timeString}</span>
            <span className="arc-reactor-label">{isRunning ? 'FLOW STATE ACTIVE' : 'PAUSED'}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="focus-controls">
          <button
            className={`btn-focus-primary ${isRunning ? 'btn-focus-primary--pause' : ''}`}
            onClick={handleToggleTimer}
            style={{ background: currentSuit?.color }}
          >
            {isRunning ? '⏸ Pause Protocol' : '▶ Engage Deep Work'}
          </button>
          <button className="btn-focus-secondary" onClick={() => handleReset(mode)}>
            🔄 Reset
          </button>
        </div>

        {/* Ambient Soundscape Selection */}
        <div className="soundscape-section">
          <span className="soundscape-label">🎧 Neural Focus Audio:</span>
          <div className="soundscape-pills">
            {[
              { id: 'none', label: '🔇 Silent' },
              { id: 'binaural', label: '🧠 40Hz Gamma' },
              { id: 'engine', label: '🚀 Deep Space Engine' },
              { id: 'lofi', label: '🌧️ Cyber Warm Rain' },
            ].map(s => (
              <button
                key={s.id}
                className={`soundscape-pill ${soundscape === s.id ? 'soundscape-pill--active' : ''}`}
                onClick={() => handleSoundscapeChange(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Session Success Badge */}
        {sessionCompleted && (
          <div className="focus-success-card animate-fade-in">
            <span className="focus-success-icon">🎉</span>
            <div>
              <div className="focus-success-title">Flow State Objective Completed!</div>
              <div className="focus-success-desc">+75 XP added to your suit power level!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
