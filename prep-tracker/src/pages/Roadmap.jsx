import React, { useState, useEffect } from 'react';
import { API_BASE } from '../utils/helpers';
import { ROADMAP_DATA, getPillarCounts } from '../utils/roadmapData';
import ProgressRing from '../components/ProgressRing';

export default function Roadmap() {
  const [progress, setProgress] = useState({});
  const [expandedPillars, setExpandedPillars] = useState({ dsa: true });
  const [filter, setFilter] = useState('all'); // 'all', 'not_started', 'in_progress', 'completed'

  useEffect(() => {
    fetch(`${API_BASE}/api/roadmap`)
      .then(r => r.json())
      .then(data => {
        const map = {};
        data.forEach(item => {
          const key = `${item.pillar}|${item.topic}|${item.subtopic}`;
          map[key] = item.status;
        });
        setProgress(map);
      })
      .catch(() => {});
  }, []);

  function getStatus(pillar, topic, subtopic) {
    const key = `${pillar}|${topic}|${subtopic}`;
    return progress[key] || 'not_started';
  }

  function cycleStatus(pillar, topic, subtopic) {
    const current = getStatus(pillar, topic, subtopic);
    const next = current === 'not_started' ? 'in_progress' : current === 'in_progress' ? 'completed' : 'not_started';
    const key = `${pillar}|${topic}|${subtopic}`;

    setProgress(prev => ({ ...prev, [key]: next }));

    fetch(`${API_BASE}/api/roadmap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pillar, topic, subtopic, status: next, progress_percent: next === 'completed' ? 100 : next === 'in_progress' ? 50 : 0 }),
    }).catch(() => {});
  }

  function getPillarProgress(pillarKey) {
    const data = ROADMAP_DATA[pillarKey];
    let total = 0, completed = 0;
    data.topics.forEach(topic => {
      topic.subtopics.forEach(sub => {
        total++;
        if (getStatus(pillarKey, topic.name, sub) === 'completed') completed++;
      });
    });
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  function getTopicProgress(pillarKey, topicName) {
    const topic = ROADMAP_DATA[pillarKey].topics.find(t => t.name === topicName);
    if (!topic) return { completed: 0, total: 0, percent: 0 };
    let completed = 0;
    topic.subtopics.forEach(sub => {
      if (getStatus(pillarKey, topicName, sub) === 'completed') completed++;
    });
    return { completed, total: topic.subtopics.length, percent: Math.round((completed / topic.subtopics.length) * 100) };
  }

  function togglePillar(key) {
    setExpandedPillars(prev => ({ ...prev, [key]: !prev[key] }));
  }

  // Calculate overall progress
  let overallTotal = 0, overallCompleted = 0;
  Object.keys(ROADMAP_DATA).forEach(key => {
    ROADMAP_DATA[key].topics.forEach(topic => {
      topic.subtopics.forEach(sub => {
        overallTotal++;
        if (getStatus(key, topic.name, sub) === 'completed') overallCompleted++;
      });
    });
  });
  const overallPercent = overallTotal > 0 ? Math.round((overallCompleted / overallTotal) * 100) : 0;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="page-header__title">🗺️ Learning Roadmap</h1>
            <p className="page-header__subtitle">Track your progress across all preparation pillars</p>
          </div>
          <ProgressRing percent={overallPercent} size={90} strokeWidth={8} label="Overall" />
        </div>
      </div>

      <div className="page-body">
        {/* Filter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
          <div className="tabs">
            {['all', 'not_started', 'in_progress', 'completed'].map(f => (
              <button key={f} className={`tab ${filter === f ? 'tab--active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? '📋 All' : f === 'not_started' ? '⬜ Not Started' : f === 'in_progress' ? '🟡 In Progress' : '✅ Completed'}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            <strong>{overallCompleted}</strong> / {overallTotal} topics completed
          </div>
        </div>

        {/* Pillar List */}
        {Object.entries(ROADMAP_DATA).map(([pillarKey, pillarData]) => {
          const pillarPercent = getPillarProgress(pillarKey);
          const isExpanded = expandedPillars[pillarKey];

          return (
            <div className="roadmap-pillar" key={pillarKey} style={{ marginBottom: 'var(--space-4)' }}>
              <div className="roadmap-pillar__header" onClick={() => togglePillar(pillarKey)}>
                <div className="roadmap-pillar__title">
                  <span className="roadmap-pillar__icon">{pillarData.icon}</span>
                  <span>{pillarData.name}</span>
                </div>
                <div className="roadmap-pillar__progress">
                  <div className="roadmap-pillar__bar">
                    <div
                      className="roadmap-pillar__bar-fill"
                      style={{ width: `${pillarPercent}%`, background: pillarData.gradient }}
                    />
                  </div>
                  <span className="roadmap-pillar__percent">{pillarPercent}%</span>
                  <span style={{ fontSize: '16px', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
                </div>
              </div>

              {isExpanded && (
                <div className="roadmap-topics" style={{ animation: 'fadeIn 0.2s ease-out' }}>
                  {pillarData.topics.map(topic => {
                    const tp = getTopicProgress(pillarKey, topic.name);
                    const filteredSubs = topic.subtopics.filter(sub => {
                      if (filter === 'all') return true;
                      return getStatus(pillarKey, topic.name, sub) === filter;
                    });

                    if (filter !== 'all' && filteredSubs.length === 0) return null;

                    return (
                      <div key={topic.name} style={{ marginBottom: 'var(--space-4)' }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: 'var(--space-2) var(--space-4)', marginBottom: 'var(--space-1)',
                        }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {topic.name}
                          </span>
                          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                            {tp.completed}/{tp.total}
                          </span>
                        </div>

                        {/* Topic progress bar */}
                        <div style={{ padding: '0 var(--space-4)', marginBottom: 'var(--space-2)' }}>
                          <div style={{ height: '4px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)' }}>
                            <div style={{
                              height: '100%', width: `${tp.percent}%`,
                              background: pillarData.gradient, borderRadius: 'var(--radius-full)',
                              transition: 'width 0.3s ease',
                            }} />
                          </div>
                        </div>

                        {filteredSubs.map(sub => {
                          const status = getStatus(pillarKey, topic.name, sub);
                          return (
                            <div
                              key={sub}
                              className="roadmap-topic"
                              onClick={() => cycleStatus(pillarKey, topic.name, sub)}
                            >
                              <div className={`roadmap-topic__checkbox roadmap-topic__checkbox--${status}`}>
                                {status === 'completed' ? '✓' : status === 'in_progress' ? '◔' : ''}
                              </div>
                              <span className={`roadmap-topic__name ${status === 'completed' ? 'roadmap-topic__name--completed' : ''}`}>
                                {sub}
                              </span>
                              <span className={`roadmap-topic__status roadmap-topic__status--${status.replace('_', '-')}`}>
                                {status === 'not_started' ? 'Not Started' : status === 'in_progress' ? 'In Progress' : 'Done'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
