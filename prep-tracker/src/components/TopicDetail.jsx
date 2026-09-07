import React, { useState, useRef, useMemo } from 'react';
import { useRole } from '../utils/RoleContext';
import { CURATED_TOPIC_VIDEOS } from '../utils/roleRoadmaps';
import { LANGUAGE_METADATA, LANGUAGE_CHEATSHEETS, PATTERN_TEMPLATES } from '../utils/languageTemplates';
import { getTopicKnowledge } from '../utils/topicKnowledgeBase';

// Extract YouTube video ID from various URL formats
export function extractYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function TopicDetail({ topic, sectionId, onClose, onStatusChange, currentStatus }) {
  const { activeRole, preferredLanguage, changeLanguage, SUPPORTED_LANGUAGES, addCustomVideo, getCustomVideos, removeCustomVideo } = useRole();
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'leetcode' | 'videos' | 'practice'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [codeLang, setCodeLang] = useState(preferredLanguage || 'python');
  const searchInputRef = useRef(null);

  if (!topic) return null;

  const customVideos = getCustomVideos(sectionId, topic.name);

  // Combine curated videos + custom videos for this topic
  const curatedList = useMemo(() => {
    return topic.videos?.length > 0 ? topic.videos : (CURATED_TOPIC_VIDEOS[topic.name] || []);
  }, [topic]);

  const allAvailableVideos = useMemo(() => {
    const list = [...curatedList];
    customVideos.forEach(cv => {
      const vid = extractYouTubeId(cv.youtube_url);
      if (vid) {
        list.push({
          title: cv.video_title || 'Custom Video',
          videoId: vid,
          channel: 'My Saved Video',
          isCustom: true,
          id: cv.id,
        });
      }
    });
    return list;
  }, [curatedList, customVideos]);

  const activeVideo = allAvailableVideos[selectedVideoIndex] || allAvailableVideos[0] || null;

  const currentLangMeta = LANGUAGE_METADATA[preferredLanguage] || LANGUAGE_METADATA.python;
  const activeCodeLangMeta = LANGUAGE_METADATA[codeLang] || LANGUAGE_METADATA.python;
  const currentCheatsheet = LANGUAGE_CHEATSHEETS[codeLang] || LANGUAGE_CHEATSHEETS.python;

  // Retrieve comprehensive notes and LeetCode problem data
  const knowledge = useMemo(() => {
    return getTopicKnowledge(topic.name, codeLang);
  }, [topic.name, codeLang]);

  const leetcode = knowledge?.leetcodeProblem || null;
  const activeSolution = leetcode?.solutions?.[codeLang] || leetcode?.solutions?.python || '';

  function handleOpenYouTubeSearch(query) {
    const langName = currentLangMeta?.name || 'Python';
    const q = query || searchQuery || `${topic.name} in ${langName} tutorial`;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  }

  function handleOpenExternal(url) {
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  }

  function handleAddVideo() {
    if (!newVideoUrl.trim()) return;
    const vid = extractYouTubeId(newVideoUrl);
    if (!vid) {
      alert('Please enter a valid YouTube video link (e.g. https://www.youtube.com/watch?v=...)');
      return;
    }
    const title = newVideoTitle.trim() || `Tutorial (${topic.name})`;
    addCustomVideo(sectionId, topic.name, title, newVideoUrl.trim());
    setNewVideoUrl('');
    setNewVideoTitle('');
    setShowAddVideo(false);
    setSelectedVideoIndex(allAvailableVideos.length);
  }

  function handleCopyCode(code) {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  }

  const statusOptions = [
    { value: 'not_started', label: 'Not Started', icon: '⬜', color: 'var(--text-tertiary)' },
    { value: 'in_progress', label: 'Watching', icon: '👁️', color: 'var(--accent-orange)' },
    { value: 'practiced', label: 'Practiced', icon: '💪', color: 'var(--accent-blue)' },
    { value: 'completed', label: 'Mastered', icon: '✅', color: 'var(--accent-green)' },
  ];

  return (
    <div className={`topic-detail-overlay ${isFullscreen ? 'topic-detail-overlay--fullscreen' : ''}`} onClick={onClose}>
      <div
        className={`topic-detail ${isFullscreen ? 'topic-detail--fullscreen' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="topic-detail__header">
          <div className="topic-detail__header-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`badge badge--${topic.difficulty}`}>{topic.difficulty}</span>
              {topic.estimatedHours && (
                <span className="topic-detail__hours">~{topic.estimatedHours}h est.</span>
              )}
            </div>

            <div className="topic-detail__header-actions">
              <button
                className="topic-detail__fullscreen-btn"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? 'Exit Full Screen' : 'Expand to Full Screen for Maximum Clarity'}
              >
                {isFullscreen ? '🗗 Restore View' : '⛶ Full Screen'}
              </button>
              <button className="topic-detail__close" onClick={onClose} title="Close panel">✕</button>
            </div>
          </div>

          <h2 className="topic-detail__title">{topic.name}</h2>
          <p className="topic-detail__theory">{topic.theory}</p>

          {/* Multi-Language Switcher in Topic Bar */}
          <div className="topic-detail__lang-bar">
            <span className="topic-detail__lang-label">Active Coding Language:</span>
            <div className="topic-detail__lang-pills">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.key}
                  className={`topic-lang-pill ${codeLang === lang.key ? 'topic-lang-pill--active' : ''}`}
                  onClick={() => {
                    changeLanguage(lang.key);
                    setCodeLang(lang.key);
                  }}
                  title={`Learn ${topic.name} in ${lang.name}`}
                >
                  <span>{lang.icon}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Status Selector */}
          <div className="topic-detail__status-bar">
            {statusOptions.map(opt => (
              <button
                key={opt.value}
                className={`topic-detail__status-btn ${currentStatus === opt.value ? 'topic-detail__status-btn--active' : ''}`}
                onClick={() => onStatusChange(opt.value)}
                style={currentStatus === opt.value ? { borderColor: opt.color, color: opt.color } : {}}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Tags */}
          {topic.tags?.length > 0 && (
            <div className="topic-detail__tags">
              {topic.tags.map(tag => (
                <span key={tag} className="topic-detail__tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* 4 Dedicated Study Tabs */}
        <div className="topic-detail__tabs">
          <button
            className={`topic-detail__tab ${activeTab === 'notes' ? 'topic-detail__tab--active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            📝 Comprehensive Notes
          </button>
          <button
            className={`topic-detail__tab ${activeTab === 'leetcode' ? 'topic-detail__tab--active' : ''}`}
            onClick={() => setActiveTab('leetcode')}
          >
            🧩 LeetCode & Visual Trace
          </button>
          <button
            className={`topic-detail__tab ${activeTab === 'videos' ? 'topic-detail__tab--active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            📹 Videos & Lessons
          </button>
          <button
            className={`topic-detail__tab ${activeTab === 'practice' ? 'topic-detail__tab--active' : ''}`}
            onClick={() => setActiveTab('practice')}
          >
            🔗 Practice Arena
          </button>
        </div>

        {/* Tab Content */}
        <div className="topic-detail__content">
          {/* ─── 1. Comprehensive Notes Tab ────────────────────────── */}
          {activeTab === 'notes' && (
            <div className="topic-detail__notes-tab animate-fade-in">
              {/* Concept Overview Card */}
              <div className="notes-hero-card">
                <div className="notes-hero-icon">📖</div>
                <div className="notes-hero-body">
                  <h3>Mastery Guide: {topic.name}</h3>
                  <p className="notes-hero-text">{knowledge?.notes?.overview || topic.theory}</p>
                </div>
              </div>

              {/* Key Formulas & Core Concepts Grid */}
              <div className="notes-section">
                <h4 className="notes-section-title">📐 Key Mathematical & Algorithmic Concepts</h4>
                <div className="notes-concepts-grid">
                  {knowledge?.notes?.keyConcepts?.map((concept, idx) => (
                    <div key={idx} className="concept-card">
                      <div className="concept-card__header">
                        <span className="concept-card__num">0{idx + 1}</span>
                        <h5 className="concept-card__title">{concept.title}</h5>
                      </div>
                      <p className="concept-card__desc">{concept.desc}</p>
                      {concept.formula && (
                        <div className="concept-card__formula">
                          <code>{concept.formula}</code>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Language Syntax & Data Structure Reference */}
              <div className="notes-section">
                <div className="notes-section-header-flex">
                  <h4 className="notes-section-title">
                    💻 {activeCodeLangMeta.icon} {activeCodeLangMeta.name} Quick Syntax Cheat-Sheet
                  </h4>
                  <div className="notes-lang-pills">
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <button
                        key={lang.key}
                        className={`notes-lang-btn ${codeLang === lang.key ? 'notes-lang-btn--active' : ''}`}
                        onClick={() => setCodeLang(lang.key)}
                      >
                        {lang.icon} {lang.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="code-cheatsheet-box">
                  <div className="code-cheatsheet-table">
                    {currentCheatsheet.dataStructures.map((ds, i) => (
                      <div key={i} className="code-cheatsheet-row">
                        <div className="code-cheatsheet-name">{ds.name}</div>
                        <div className="code-cheatsheet-syntax"><code>{ds.syntax}</code></div>
                        <div className="code-cheatsheet-ops">{ds.ops}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {currentCheatsheet.tips?.length > 0 && (
                  <div className="code-tips-box">
                    <div className="code-tips-title">💡 {activeCodeLangMeta.name} Interview Tips:</div>
                    <ul className="code-tips-list">
                      {currentCheatsheet.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Common Pitfalls & Traps */}
              {knowledge?.notes?.pitfalls?.length > 0 && (
                <div className="notes-pitfalls-card">
                  <h4>⚠️ Common Pitfalls & Interview Traps</h4>
                  <ul className="notes-pitfalls-list">
                    {knowledge.notes.pitfalls.map((pitfall, i) => (
                      <li key={i}>{pitfall}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Deep-Dive Links */}
              <div className="notes-section">
                <h4 className="notes-section-title">🔍 External Deep-Dive Documentation</h4>
                <div className="theory-card__search-links">
                  <button className="theory-card__search-btn" onClick={() => handleOpenExternal(`https://www.google.com/search?q=${encodeURIComponent(topic.name + ' in ' + activeCodeLangMeta.name + ' tutorial algorithm explained')}`)}>
                    🌐 Google Search ({activeCodeLangMeta.name})
                  </button>
                  <button className="theory-card__search-btn" onClick={() => handleOpenExternal(`https://en.wikipedia.org/wiki/${encodeURIComponent(topic.name.replace(/ /g, '_'))}`)}>
                    📖 Wikipedia
                  </button>
                  <button className="theory-card__search-btn" onClick={() => handleOpenExternal(`https://www.geeksforgeeks.org/${encodeURIComponent(topic.name.toLowerCase().replace(/ /g, '-'))}/`)}>
                    🟢 GeeksForGeeks
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── 2. LeetCode Problem & Visual Trace Tab ─────────────── */}
          {activeTab === 'leetcode' && leetcode && (
            <div className="topic-detail__leetcode-tab animate-fade-in">
              {/* Problem Banner */}
              <div className="leetcode-problem-card">
                <div className="leetcode-problem-header">
                  <div className="leetcode-problem-title-box">
                    <span className="leetcode-tag">🟠 LeetCode Canonical Problem</span>
                    <h3 className="leetcode-title">{leetcode.title}</h3>
                  </div>
                  <div className="leetcode-header-actions">
                    <span className={`badge badge--${leetcode.difficulty.toLowerCase()}`}>{leetcode.difficulty}</span>
                    <button
                      className="btn-open-leetcode"
                      onClick={() => handleOpenExternal(leetcode.leetcodeUrl)}
                    >
                      ▶ Solve on LeetCode ↗
                    </button>
                  </div>
                </div>

                <p className="leetcode-desc">{leetcode.description}</p>

                {/* Example box */}
                {leetcode.examples?.length > 0 && (
                  <div className="leetcode-example-box">
                    <strong>Example:</strong>
                    <div className="leetcode-example-item">
                      <div><span className="example-lbl">Input:</span> <code>{leetcode.examples[0].input}</code></div>
                      <div><span className="example-lbl">Output:</span> <code>{leetcode.examples[0].output}</code></div>
                      {leetcode.examples[0].explanation && (
                        <div className="example-exp">{leetcode.examples[0].explanation}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Step-by-Step Visual Execution Trace */}
              {leetcode.visualTrace && (
                <div className="visual-trace-container">
                  <div className="visual-trace-header">
                    <div className="visual-trace-title">
                      <span>👁️ {leetcode.visualTrace.title}</span>
                    </div>
                    <span className="visual-trace-badge">Visual Algorithm Walkthrough</span>
                  </div>

                  <div className="visual-trace-steps">
                    {leetcode.visualTrace.steps.map((st, i) => (
                      <div key={i} className="step-trace-card">
                        <div className="step-trace-top">
                          <span className="step-number-badge">Step {st.step}</span>
                          <span className="step-state-text">{st.state}</span>
                        </div>
                        {st.diagram && (
                          <pre className="step-diagram-pre">
                            <code>{st.diagram}</code>
                          </pre>
                        )}
                        <div className="step-action-desc">
                          <span className="step-action-icon">💡</span>
                          <span>{st.action}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Multi-Language Code Implementation */}
              <div className="leetcode-code-container">
                <div className="leetcode-code-header">
                  <div className="leetcode-code-lang-info">
                    <span>💻 Complete Solution in {activeCodeLangMeta.name}</span>
                  </div>
                  <div className="leetcode-code-controls">
                    <div className="code-lang-tabs">
                      {SUPPORTED_LANGUAGES.map(lang => (
                        <button
                          key={lang.key}
                          className={`code-lang-tab ${codeLang === lang.key ? 'code-lang-tab--active' : ''}`}
                          onClick={() => setCodeLang(lang.key)}
                        >
                          <span>{lang.icon}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                    <button
                      className="code-copy-btn"
                      onClick={() => handleCopyCode(activeSolution)}
                    >
                      {copiedCode ? '✓ Copied!' : '📋 Copy Code'}
                    </button>
                  </div>
                </div>

                <div className="code-block-wrapper">
                  <pre className="code-pre">
                    <code>{activeSolution}</code>
                  </pre>
                </div>
              </div>

              {/* Complexity Analysis Box */}
              {leetcode.complexity && (
                <div className="complexity-grid">
                  <div className="complexity-card">
                    <div className="complexity-card__icon">⏱️</div>
                    <div>
                      <div className="complexity-card__title">Time Complexity</div>
                      <div className="complexity-card__val">{leetcode.complexity.time}</div>
                    </div>
                  </div>
                  <div className="complexity-card">
                    <div className="complexity-card__icon">💾</div>
                    <div>
                      <div className="complexity-card__title">Space Complexity</div>
                      <div className="complexity-card__val">{leetcode.complexity.space}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── 3. Videos & Lessons Tab ───────────────────────────── */}
          {activeTab === 'videos' && (
            <div className="topic-detail__videos animate-fade-in">
              {/* Featured Suggested Video Card */}
              {activeVideo ? (
                <div className="video-suggestion-card">
                  <div
                    className="video-suggestion__banner"
                    onClick={() => handleOpenExternal(`https://www.youtube.com/watch?v=${activeVideo.videoId}`)}
                    title="Click to watch on YouTube in your browser"
                  >
                    <img
                      className="video-suggestion__thumb"
                      src={`https://img.youtube.com/vi/${activeVideo.videoId}/hqdefault.jpg`}
                      alt={activeVideo.title}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="video-suggestion__overlay">
                      <div className="video-suggestion__play-btn">▶</div>
                      <span className="video-suggestion__play-hint">Watch in Browser</span>
                    </div>
                    {activeVideo.duration && (
                      <span className="video-suggestion__duration">⏱️ {activeVideo.duration}</span>
                    )}
                  </div>

                  <div className="video-suggestion__details">
                    <div className="video-suggestion__meta">
                      <span className="video-suggestion__channel">
                        {activeVideo.channel ? `📺 ${activeVideo.channel}` : '📹 Recommended Creator'}
                      </span>
                      {activeVideo.isCustom && <span className="badge badge--easy">Saved Link</span>}
                    </div>
                    <h3 className="video-suggestion__title">{activeVideo.title}</h3>

                    <div className="video-suggestion__actions">
                      <button
                        className="btn-watch-yt"
                        onClick={() => handleOpenExternal(`https://www.youtube.com/watch?v=${activeVideo.videoId}`)}
                      >
                        <span>▶ Watch on YouTube (Browser) ↗</span>
                      </button>
                      <button
                        className="btn-copy-yt"
                        onClick={() => {
                          navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${activeVideo.videoId}`);
                          setCopiedLink(true);
                          setTimeout(() => setCopiedLink(false), 2000);
                        }}
                      >
                        {copiedLink ? '✓ Link Copied!' : '📋 Copy Link'}
                      </button>
                    </div>
                  </div>

                  {allAvailableVideos.length > 1 && (
                    <div className="video-suggestion__switcher">
                      <span className="video-suggestion__switcher-label">Recommended Lessons ({allAvailableVideos.length}):</span>
                      <div className="video-suggestion__pills">
                        {allAvailableVideos.map((v, i) => (
                          <button
                            key={v.videoId + i}
                            className={`video-pill ${selectedVideoIndex === i ? 'video-pill--active' : ''}`}
                            onClick={() => setSelectedVideoIndex(i)}
                          >
                            <span className="video-pill__icon">{selectedVideoIndex === i ? '▶️' : '🎬'}</span>
                            <span className="video-pill__name">{v.channel ? `${v.channel}` : v.title}</span>
                            {v.isCustom && (
                              <span
                                className="video-pill__del"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeCustomVideo(v.id, sectionId, topic.name);
                                  setSelectedVideoIndex(0);
                                }}
                                title="Remove saved video"
                              >
                                ✕
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="yt-no-direct-video">
                  <div className="yt-no-video-icon">🔍</div>
                  <h4>No default video selected</h4>
                  <p>Search YouTube below or paste your favorite tutorial link to save it.</p>
                </div>
              )}

              {/* YouTube Search Section */}
              <div className="yt-search-section">
                <div className="yt-search-section__header">
                  <h4 className="yt-search-section__title">🔎 Search YouTube for "{topic.name}"</h4>
                  {copiedLink && <span className="yt-copied-badge">✓ Link copied!</span>}
                </div>

                <div className="yt-search-bar">
                  <span className="yt-search-icon">🔍</span>
                  <input
                    ref={searchInputRef}
                    className="yt-search-input"
                    type="text"
                    placeholder={`Search YouTube for "${topic.name} in ${activeCodeLangMeta.name}"...`}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleOpenYouTubeSearch(searchQuery);
                    }}
                  />
                  <button
                    className="yt-search-submit-btn"
                    onClick={() => handleOpenYouTubeSearch(searchQuery)}
                  >
                    Search on YouTube ↗
                  </button>
                </div>

                {/* Quick Language Search Filter Buttons */}
                <div className="yt-quick-lang-searches">
                  <span className="yt-quick-queries__label">Watch tutorial in:</span>
                  <div className="yt-quick-queries__list">
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <button
                        key={lang.key}
                        className="yt-quick-pill"
                        onClick={() => handleOpenYouTubeSearch(`${topic.name} in ${lang.name} tutorial`)}
                        title={`Search ${topic.name} in ${lang.name}`}
                      >
                        <span>{lang.icon} {lang.name}</span>
                        <span className="yt-quick-pill-arrow">↗</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Search Suggestions */}
                {topic.searchQueries?.length > 0 && (
                  <div className="yt-quick-queries" style={{ marginTop: '12px' }}>
                    <span className="yt-quick-queries__label">Suggested queries:</span>
                    <div className="yt-quick-queries__list">
                      {topic.searchQueries.map((q, i) => (
                        <button
                          key={i}
                          className="yt-quick-pill"
                          onClick={() => handleOpenYouTubeSearch(q)}
                          title={`Search "${q}" on YouTube`}
                        >
                          <span>🔍 {q}</span>
                          <span className="yt-quick-pill-arrow">↗</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Add Custom Video by URL */}
              <div className="yt-add-custom-box">
                {!showAddVideo ? (
                  <button className="yt-add-toggle-btn" onClick={() => setShowAddVideo(true)}>
                    <span>➕ Found a great video? Paste YouTube Link to Save Here</span>
                  </button>
                ) : (
                  <div className="yt-add-form animate-fade-in">
                    <div className="yt-add-form__header">
                      <h4>📌 Save YouTube Video to this Topic</h4>
                      <button className="yt-add-form__close" onClick={() => setShowAddVideo(false)}>✕</button>
                    </div>
                    <div className="yt-add-form__body">
                      <div className="form-group">
                        <label className="form-label">Video Title / Instructor (optional)</label>
                        <input
                          className="form-input"
                          type="text"
                          placeholder="e.g., NeetCode - Optimal Solution"
                          value={newVideoTitle}
                          onChange={e => setNewVideoTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">YouTube Video URL *</label>
                        <input
                          className="form-input"
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=... or youtu.be/..."
                          value={newVideoUrl}
                          onChange={e => setNewVideoUrl(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') handleAddVideo(); }}
                        />
                      </div>
                      <div className="yt-add-form__actions">
                        <button className="btn btn--secondary btn--sm" onClick={() => setShowAddVideo(false)}>Cancel</button>
                        <button className="btn btn--primary btn--sm" onClick={handleAddVideo} disabled={!newVideoUrl.trim()}>
                          Save Video Link
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── 4. Practice Arena Tab ─────────────────────────────── */}
          {activeTab === 'practice' && (
            <div className="topic-detail__practice-tab animate-fade-in">
              {topic.practiceLinks?.length > 0 ? (
                <>
                  <h4 className="practice-title">🔗 Curated Practice Problems</h4>
                  {topic.practiceLinks.map((link, i) => (
                    <div key={i} className="practice-card" onClick={() => handleOpenExternal(link.url)}>
                      <div className="practice-card__platform">
                        {link.platform === 'leetcode' ? '🟠' : link.platform === 'kaggle' ? '📊' : link.platform === 'freecodecamp' ? '🏕️' : '🔗'}
                      </div>
                      <div className="practice-card__info">
                        <div className="practice-card__name">{link.name}</div>
                        <div className="practice-card__url">{link.platform} ↗</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="practice-empty">
                  <p>Practice canonical problem in the <strong>LeetCode Tab</strong> or search below.</p>
                </div>
              )}

              <h4 className="practice-title" style={{ marginTop: '24px' }}>🌐 Search Online Practice in {activeCodeLangMeta.name}</h4>
              <div className="practice-search-links">
                <button className="practice-search-btn" onClick={() => handleOpenExternal(`https://leetcode.com/problemset/?search=${encodeURIComponent(topic.name)}`)}>
                  🟠 Search LeetCode
                </button>
                <button className="practice-search-btn" onClick={() => handleOpenExternal(`https://www.hackerrank.com/domains?filters%5Bskills%5D%5B%5D=${encodeURIComponent(topic.name)}`)}>
                  🟢 HackerRank
                </button>
                <button className="practice-search-btn" onClick={() => handleOpenExternal(`https://neetcode.io/`)}>
                  🔵 NeetCode.io
                </button>
                <button className="practice-search-btn" onClick={() => handleOpenExternal(`https://www.geeksforgeeks.org/${encodeURIComponent(topic.name.toLowerCase().replace(/ /g, '-'))}/`)}>
                  🟢 GeeksForGeeks
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
