import React, { useState, useEffect } from 'react';
import { API_BASE, formatTime } from '../utils/helpers';
import HeatmapCalendar from '../components/HeatmapCalendar';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  ArcElement, RadialLinearScale, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  ArcElement, RadialLinearScale, Tooltip, Legend, Filler
);

export default function Statistics() {
  const [overview, setOverview] = useState(null);
  const [heatmapData, setHeatmapData] = useState({});
  const [period, setPeriod] = useState('week');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/stats/overview`).then(r => r.json()),
      fetch(`${API_BASE}/api/daily-logs?days=365`).then(r => r.json()),
    ])
      .then(([ov, logs]) => {
        setOverview(ov);
        const map = {};
        logs.forEach(l => { map[l.date] = l.problems_solved; });
        setHeatmapData(map);
        setLoading(false);
      })
      .catch(() => {
        setOverview({
          today: { problems_solved: 0, study_minutes: 0 },
          weekProblems: 0, monthProblems: 0, totalProblems: 0,
          weekStudyHours: 0, monthStudyHours: 0,
          byDifficulty: [], byPlatform: [], byCategory: [],
          weeklyTrend: [], monthlyTrend: [],
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="empty-state"><div className="empty-state__icon">⏳</div><div className="empty-state__title">Loading statistics...</div></div>;
  }

  const trendData = period === 'week' ? (overview?.weeklyTrend || []) : (overview?.monthlyTrend || []);

  const lineChartData = {
    labels: trendData.map(d => d.date.slice(5)),
    datasets: [
      {
        label: 'Problems Solved',
        data: trendData.map(d => d.problems_solved),
        borderColor: '#4F6EF7',
        backgroundColor: 'rgba(79, 110, 247, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const studyChartData = {
    labels: trendData.map(d => d.date.slice(5)),
    datasets: [
      {
        label: 'Minutes Studied',
        data: trendData.map(d => d.study_minutes),
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
        borderColor: '#8B5CF6',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const difficultyData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [{
      data: [
        overview?.byDifficulty?.find(d => d.difficulty === 'easy')?.count || 0,
        overview?.byDifficulty?.find(d => d.difficulty === 'medium')?.count || 0,
        overview?.byDifficulty?.find(d => d.difficulty === 'hard')?.count || 0,
      ],
      backgroundColor: ['#22C55E', '#F59E0B', '#EF4444'],
      borderWidth: 0,
    }],
  };

  const platformData = {
    labels: (overview?.byPlatform || []).map(p => p.platform),
    datasets: [{
      data: (overview?.byPlatform || []).map(p => p.count),
      backgroundColor: ['#FFA116', '#4F46E5', '#00EA64', '#2F8D46', '#8B5CF6'],
      borderWidth: 0,
    }],
  };

  const categoryData = {
    labels: (overview?.byCategory || []).slice(0, 8).map(c => c.category),
    datasets: [{
      label: 'Problems',
      data: (overview?.byCategory || []).slice(0, 8).map(c => c.count),
      backgroundColor: 'rgba(79, 110, 247, 0.7)',
      borderColor: '#4F6EF7',
      borderWidth: 1,
      borderRadius: 6,
    }],
  };

  const radarData = {
    labels: ['DSA', 'ML Theory', 'Deep Learning', 'NLP/CV', 'System Design'],
    datasets: [{
      label: 'Skill Coverage',
      data: [65, 40, 35, 25, 20], // Placeholder — would compute from roadmap progress
      backgroundColor: 'rgba(79, 110, 247, 0.15)',
      borderColor: '#4F6EF7',
      borderWidth: 2,
      pointBackgroundColor: '#4F6EF7',
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1A1D2E',
        titleFont: { family: 'Inter', size: 12 },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 } } },
      y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { family: 'Inter', size: 11 } }, beginAtZero: true },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { font: { family: 'Inter', size: 12 }, padding: 16, usePointStyle: true } },
    },
    cutout: '65%',
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { font: { size: 10 }, backdropColor: 'transparent' },
        pointLabels: { font: { family: 'Inter', size: 12, weight: 600 } },
        grid: { color: 'rgba(0,0,0,0.06)' },
      },
    },
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-header__title">📊 Statistics & Analytics</h1>
        <p className="page-header__subtitle">Deep dive into your preparation progress</p>
      </div>

      <div className="page-body">
        {/* Period Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
          <div className="tabs">
            <button className={`tab ${period === 'week' ? 'tab--active' : ''}`} onClick={() => setPeriod('week')}>This Week</button>
            <button className={`tab ${period === 'month' ? 'tab--active' : ''}`} onClick={() => setPeriod('month')}>This Month</button>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-blue)' }}>
                {period === 'week' ? overview?.weekProblems : overview?.monthProblems}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Problems</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-purple)' }}>
                {period === 'week' ? overview?.weekStudyHours : overview?.monthStudyHours}h
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Study Hours</div>
            </div>
          </div>
        </div>

        {/* Charts Row 1: Trend + Study Hours */}
        <div className="chart-grid">
          <div className="chart-card">
            <div className="chart-card__header">
              <div className="chart-card__title">Problems Solved Trend</div>
            </div>
            <div style={{ height: '250px' }}>
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-card__header">
              <div className="chart-card__title">Study Hours</div>
            </div>
            <div style={{ height: '250px' }}>
              <Bar data={studyChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Charts Row 2: Difficulty + Platform + Radar */}
        <div className="chart-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 'var(--space-5)' }}>
          <div className="chart-card">
            <div className="chart-card__header">
              <div className="chart-card__title">By Difficulty</div>
            </div>
            <div style={{ height: '220px' }}>
              <Doughnut data={difficultyData} options={doughnutOptions} />
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-card__header">
              <div className="chart-card__title">By Platform</div>
            </div>
            <div style={{ height: '220px' }}>
              <Doughnut data={platformData} options={doughnutOptions} />
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-card__header">
              <div className="chart-card__title">Skill Radar</div>
            </div>
            <div style={{ height: '220px' }}>
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        {(overview?.byCategory?.length || 0) > 0 && (
          <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
            <div className="chart-card__header">
              <div className="chart-card__title">Problems by Category</div>
            </div>
            <div style={{ height: '280px' }}>
              <Bar data={categoryData} options={{ ...chartOptions, indexAxis: 'y' }} />
            </div>
          </div>
        )}

        {/* Heatmap */}
        <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-card__header">
            <div className="chart-card__title">📅 Year in Review</div>
          </div>
          <HeatmapCalendar data={heatmapData} />
        </div>
      </div>
    </div>
  );
}
