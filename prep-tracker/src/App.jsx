import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RoleProvider, useRole } from './utils/RoleContext';
import { GamificationProvider, useGamification } from './utils/GamificationContext';
import Sidebar from './components/Sidebar';
import TitleBar from './components/TitleBar';
import FocusTimer from './components/FocusTimer';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Roadmap from './pages/Roadmap';
import Streaks from './pages/Streaks';
import Reminders from './pages/Reminders';
import ManualLog from './pages/ManualLog';
import Reports from './pages/Reports';
import RoleSelector from './pages/RoleSelector';
import Journey from './pages/Journey';
import InterviewPrep from './pages/InterviewPrep';
import PracticeArena from './pages/PracticeArena';
import TechRadar from './pages/TechRadar';
import SeniorMindset from './pages/SeniorMindset';

function XpGainToast() {
  const { recentXpGain } = useGamification();
  if (!recentXpGain) return null;

  return (
    <div className="xp-gain-toast animate-slide-up">
      <span className="xp-gain-toast__icon">⚡</span>
      <div>
        <div className="xp-gain-toast__amount">+{recentXpGain.amount} XP</div>
        <div className="xp-gain-toast__reason">{recentXpGain.reason}</div>
      </div>
    </div>
  );
}

function AppContent() {
  const { onboardingComplete } = useRole();
  const [showFocusTimer, setShowFocusTimer] = useState(false);

  // Still loading settings
  if (onboardingComplete === null) {
    return (
      <div className="app-loading">
        <div className="app-loading__spinner" />
        <div className="app-loading__text">Loading PrepTracker Jarvis Engine...</div>
      </div>
    );
  }

  // No role selected — show onboarding
  if (!onboardingComplete) {
    return <RoleSelector />;
  }

  // Main app
  return (
    <>
      <TitleBar />
      <div className="app-layout">
        <Sidebar onOpenFocus={() => setShowFocusTimer(true)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/practice-arena" element={<PracticeArena />} />
            <Route path="/tech-radar" element={<TechRadar />} />
            <Route path="/senior-mindset" element={<SeniorMindset />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/streaks" element={<Streaks />} />
            <Route path="/interview-prep" element={<InterviewPrep />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/log" element={<ManualLog />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>

      <XpGainToast />
      {showFocusTimer && <FocusTimer onClose={() => setShowFocusTimer(false)} />}
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <GamificationProvider>
        <RoleProvider>
          <AppContent />
        </RoleProvider>
      </GamificationProvider>
    </HashRouter>
  );
}

