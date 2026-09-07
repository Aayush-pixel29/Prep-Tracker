import React, { useState, useEffect, useMemo } from 'react';
import { useRole } from '../utils/RoleContext';
import { API_BASE } from '../utils/helpers';
import ProgressRing from '../components/ProgressRing';
import TopicDetail from '../components/TopicDetail';

export default function Roadmap() {
  const { activeRole, roleData, preferredLanguage, changeLanguage, SUPPORTED_LANGUAGES } = useRole();
  const [progress, setProgress] = useState({});
  const [expandedPhases, setExpandedPhases] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null); // { topic, sectionId }

  // Load progress
  useEffect(() => {
    fetch(`${API_BASE}/api/roadmap`)
      .then(r => r.json())
      .then(data => {
        const map = {};
        data.forEach(item => {
          const key = `${item.pillar}|${item.topic}`;
          map[key] = item.status;
        });
        setProgress(map);
      })
      .catch(() => {});
  }, [activeRole]);

  // Auto-expand first incomplete phase
  useEffect(() => {
    if (roleData?.phases) {
      const firstPhase = roleData.phases[0];
      if (firstPhase) {
        setExpandedPhases({ [firstPhase.id]: true });
        if (firstPhase.sections[0]) {
          setExpandedSections({ [firstPhase.sections[0].id]: true });
        }
      }
    }
  }, [roleData]);

  function getStatus(sectionId, topicName) {
    const key = `${activeRole}:${sectionId}|${topicName}`;
    return progress[key] || 'not_started';
  }

  function cycleStatus(sectionId, topicName) {
    const current = getStatus(sectionId, topicName);
    const next = current === 'not_started' ? 'in_progress'
      : current === 'in_progress' ? 'practiced'
      : current === 'practiced' ? 'completed'
      : 'not_started';
    updateStatus(sectionId, topicName, next);
  }

  function updateStatus(sectionId, topicName, newStatus) {
    const pillar = `${activeRole}:${sectionId}`;
    const key = `${pillar}|${topicName}`;
    setProgress(prev => ({ ...prev, [key]: newStatus }));

    fetch(`${API_BASE}/api/roadmap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pillar,
        topic: topicName,
        subtopic: '',
        status: newStatus,
        progress_percent: newStatus === 'completed' ? 100 : newStatus === 'practiced' ? 75 : newStatus === 'in_progress' ? 25 : 0,
      }),
    }).catch(() => {});
  }

  // Calculate progress
  const progressStats = useMemo(() => {
    if (!roleData) return { overall: 0, byPhase: {}, bySection: {} };

    let totalTopics = 0, completedTopics = 0;
    const byPhase = {};
    const bySection = {};

    roleData.phases.forEach(phase => {
      let phaseTotal = 0, phaseCompleted = 0;
      phase.sections.forEach(section => {
        let secTotal = 0, secCompleted = 0;
        section.topics.forEach(t => {
          totalTopics++;
          phaseTotal++;
          secTotal++;
          const status = getStatus(section.id, t.name);
          if (status === 'completed') {
            completedTopics++;
            phaseCompleted++;
            secCompleted++;
          }
        });
        bySection[section.id] = { total: secTotal, completed: secCompleted, percent: secTotal > 0 ? Math.round((secCompleted / secTotal) * 100) : 0 };
      });
      byPhase[phase.id] = { total: phaseTotal, completed: phaseCompleted, percent: phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0 };
    });

    return {
      overall: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
      totalTopics,
      completedTopics,
      byPhase,
      bySection,
    };
  }, [roleData, progress, activeRole]);

  // Find "what's next" — first incomplete topic
  const nextTopic = useMemo(() => {
    if (!roleData) return null;
    for (const phase of roleData.phases) {
      for (const section of phase.sections) {
        for (const t of section.topics) {
          const status = getStatus(section.id, t.name);
          if (status !== 'completed') {
            return { topic: t, sectionId: section.id, phaseName: phase.name };
          }
        }
      }
    }
    return null;
  }, [roleData, progress, activeRole]);

  if (!roleData) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">🗺️</div>
        <div className="empty-state__title">No role selected</div>
        <div className="empty-state__desc">Select a role to see your personalized roadmap.</div>
      </div>
    );
  }

  const statusIcons = {
    not_started: '⬜',
    in_progress: '👁️',
    practiced: '💪',
    completed: '✅',
  };

  const statusLabels = {
    not_started: 'Not Started',
    in_progress: 'Watching',
    practiced: 'Practiced',
    completed: 'Mastered',
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="page-header__title">
              {roleData.icon} {roleData.name} Roadmap
            </h1>
            <p className="page-header__subtitle">
              {progressStats.completedTopics} / {progressStats.totalTopics} topics completed • ~{roleData.estimatedWeeks} weeks estimated
            </p>
            {/* Active Language Switcher */}
            <div className="roadmap-lang-bar">
              <span className="roadmap-lang-label">Practice Language:</span>
              <div className="roadmap-lang-pills">
                {SUPPORTED_LANGUAGES.map(lang => (
                  <button
                    key={lang.key}
                    className={`roadmap-lang-pill ${preferredLanguage === lang.key ? 'roadmap-lang-pill--active' : ''}`}
                    onClick={() => changeLanguage(lang.key)}
                    title={`Practice in ${lang.name}`}
                  >
                    <span>{lang.icon}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <ProgressRing percent={progressStats.overall} size={90} strokeWidth={8} label="Overall" />
        </div>
      </div>

      <div className="page-body">
        {/* What's Next Banner */}
        {nextTopic && (
          <div
            className="whats-next-banner"
            style={{ background: roleData.gradient }}
            onClick={() => setSelectedTopic({ topic: nextTopic.topic, sectionId: nextTopic.sectionId })}
          >
            <div className="whats-next-banner__content">
              <span className="whats-next-banner__label">▶ Continue where you left off</span>
              <span className="whats-next-banner__topic">{nextTopic.topic.name}</span>
              <span className="whats-next-banner__phase">{nextTopic.phaseName}</span>
            </div>
            <span className="whats-next-banner__arrow">→</span>
          </div>
        )}

        {/* Search & Filter */}
        <div className="roadmap-controls">
          <input
            className="roadmap-search"
            type="text"
            placeholder="🔍 Search topics..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="tabs">
            {['all', 'not_started', 'in_progress', 'practiced', 'completed'].map(f => (
              <button key={f} className={`tab ${filter === f ? 'tab--active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? '📋 All' : f === 'not_started' ? '⬜ Todo' : f === 'in_progress' ? '👁️ Watching' : f === 'practiced' ? '💪 Practiced' : '✅ Mastered'}
              </button>
            ))}
          </div>
        </div>

        {/* Phase List */}
        {roleData.phases.map(phase => {
          const phaseStats = progressStats.byPhase[phase.id] || { percent: 0, total: 0, completed: 0 };
          const isPhaseExpanded = expandedPhases[phase.id];

          return (
            <div className="phase-block" key={phase.id}>
              {/* Phase Header */}
              <div className="phase-block__header" onClick={() => setExpandedPhases(prev => ({ ...prev, [phase.id]: !prev[phase.id] }))}>
                <div className="phase-block__left">
                  <span className="phase-block__icon">{phase.icon}</span>
                  <div>
                    <div className="phase-block__name">{phase.name}</div>
                    <div className="phase-block__meta">{phase.duration} • {phase.description}</div>
                  </div>
                </div>
                <div className="phase-block__right">
                  <div className="phase-block__bar-container">
                    <div className="phase-block__bar">
                      <div className="phase-block__bar-fill" style={{ width: `${phaseStats.percent}%`, background: roleData.gradient }} />
                    </div>
                    <span className="phase-block__percent">{phaseStats.percent}%</span>
                  </div>
                  <span className="phase-block__completed">{phaseStats.completed}/{phaseStats.total}</span>
                  <span className={`phase-block__arrow ${isPhaseExpanded ? 'phase-block__arrow--open' : ''}`}>▾</span>
                </div>
              </div>

              {/* Phase Sections */}
              {isPhaseExpanded && (
                <div className="phase-block__body">
                  {phase.sections.map(section => {
                    const secStats = progressStats.bySection[section.id] || { percent: 0, total: 0, completed: 0 };
                    const isSectionExpanded = expandedSections[section.id];

                    // Filter topics
                    const filteredTopics = section.topics.filter(t => {
                      const status = getStatus(section.id, t.name);
                      const matchesFilter = filter === 'all' || status === filter;
                      const matchesSearch = !searchTerm || t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
                      return matchesFilter && matchesSearch;
                    });

                    if (filteredTopics.length === 0 && (filter !== 'all' || searchTerm)) return null;

                    return (
                      <div className="section-block" key={section.id}>
                        <div className="section-block__header" onClick={() => setExpandedSections(prev => ({ ...prev, [section.id]: !prev[section.id] }))}>
                          <div className="section-block__left">
                            <span className="section-block__icon">{section.icon}</span>
                            <span className="section-block__name">{section.name}</span>
                            <span className="section-block__count">{secStats.completed}/{secStats.total}</span>
                          </div>
                          <div className="section-block__right">
                            <div className="section-block__mini-bar">
                              <div className="section-block__mini-fill" style={{ width: `${secStats.percent}%`, background: roleData.gradient }} />
                            </div>
                            <span className={`section-block__arrow ${isSectionExpanded ? 'section-block__arrow--open' : ''}`}>▾</span>
                          </div>
                        </div>

                        {isSectionExpanded && (
                          <div className="section-block__topics">
                            {filteredTopics.map(t => {
                              const status = getStatus(section.id, t.name);
                              return (
                                <div className="topic-row" key={t.name}>
                                  <div className="topic-row__left" onClick={() => cycleStatus(section.id, t.name)}>
                                    <div className={`topic-row__checkbox topic-row__checkbox--${status}`}>
                                      {statusIcons[status]}
                                    </div>
                                    <span className={`topic-row__name ${status === 'completed' ? 'topic-row__name--done' : ''}`}>
                                      {t.name}
                                    </span>
                                  </div>
                                  <div className="topic-row__right">
                                    <span className={`badge badge--${t.difficulty}`}>{t.difficulty}</span>
                                    <span className={`topic-row__status topic-row__status--${status.replace('_', '-')}`}>
                                      {statusLabels[status]}
                                    </span>
                                    <button
                                      className="topic-row__open-btn"
                                      onClick={() => setSelectedTopic({ topic: t, sectionId: section.id })}
                                      title="Open details: videos, theory, practice"
                                    >
                                      📹 Open
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Topic Detail Panel */}
      {selectedTopic && (
        <TopicDetail
          topic={selectedTopic.topic}
          sectionId={selectedTopic.sectionId}
          currentStatus={getStatus(selectedTopic.sectionId, selectedTopic.topic.name)}
          onStatusChange={(newStatus) => {
            updateStatus(selectedTopic.sectionId, selectedTopic.topic.name, newStatus);
          }}
          onClose={() => setSelectedTopic(null)}
        />
      )}
    </div>
  );
}
