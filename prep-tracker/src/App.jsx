import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TitleBar from './components/TitleBar';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Roadmap from './pages/Roadmap';
import Streaks from './pages/Streaks';
import Reminders from './pages/Reminders';
import ManualLog from './pages/ManualLog';
import Reports from './pages/Reports';

export default function App() {
  return (
    <HashRouter>
      <TitleBar />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/streaks" element={<Streaks />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/log" element={<ManualLog />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
