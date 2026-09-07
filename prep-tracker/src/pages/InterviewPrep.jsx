import React, { useState } from 'react';
import { useRole } from '../utils/RoleContext';
import { PATTERN_TEMPLATES, LANGUAGE_METADATA } from '../utils/languageTemplates';

const INTERVIEW_SECTIONS = {
  coding: {
    name: 'Coding Interview',
    icon: '💻',
    description: 'Master problem-solving patterns for coding rounds',
    patterns: [
      { name: 'Two Pointers', desc: 'Used for sorted arrays, palindrome checks, and pair problems.', searchQuery: 'two pointers coding interview pattern' },
      { name: 'Sliding Window', desc: 'Find optimal subarrays/substrings with dynamic boundaries.', searchQuery: 'sliding window coding pattern explained' },
      { name: 'Fast & Slow Pointers', desc: 'Detect cycles, find midpoints in linked lists.', searchQuery: 'fast slow pointers tortoise hare algorithm' },
      { name: 'Merge Intervals', desc: 'Merge overlapping intervals, schedule problems.', searchQuery: 'merge intervals coding pattern' },
      { name: 'Cyclic Sort', desc: 'Find missing/duplicate numbers in sequential ranges.', searchQuery: 'cyclic sort coding pattern' },
      { name: 'BFS / DFS', desc: 'Tree and graph traversal — foundation for many problems.', searchQuery: 'BFS DFS coding interview patterns' },
      { name: 'Topological Sort', desc: 'Order tasks with dependencies — course schedule type problems.', searchQuery: 'topological sort coding interview' },
      { name: 'Binary Search Variations', desc: 'Search on answer, rotated arrays, matrix search.', searchQuery: 'binary search variations coding interview' },
      { name: 'Dynamic Programming', desc: 'Overlapping subproblems + optimal substructure.', searchQuery: 'dynamic programming patterns interview' },
      { name: 'Backtracking', desc: 'Generate permutations, combinations, solve constraint problems.', searchQuery: 'backtracking coding pattern explained' },
      { name: 'Monotonic Stack', desc: 'Next greater/smaller element, histogram problems.', searchQuery: 'monotonic stack coding pattern' },
      { name: 'Trie', desc: 'Prefix matching, autocomplete, word search problems.', searchQuery: 'trie data structure interview problems' },
    ],
  },
  system_design: {
    name: 'System Design',
    icon: '🏗️',
    description: 'Design scalable systems — common in mid/senior level interviews',
    patterns: [
      { name: 'Design URL Shortener', desc: 'Hash URLs, handle redirects, discuss scaling strategies.', searchQuery: 'design url shortener system design interview' },
      { name: 'Design Twitter / News Feed', desc: 'Fan-out, timeline generation, real-time updates.', searchQuery: 'design twitter news feed system design' },
      { name: 'Design WhatsApp / Chat', desc: 'WebSockets, message delivery, group chat, E2E encryption.', searchQuery: 'design whatsapp chat system design interview' },
      { name: 'Design YouTube / Netflix', desc: 'Video upload, transcoding, CDN, recommendation engine.', searchQuery: 'design youtube system design interview' },
      { name: 'Design Instagram', desc: 'Photo upload, news feed, stories, follower system.', searchQuery: 'design instagram system design interview' },
      { name: 'Design Uber / Ride-sharing', desc: 'Matching service, real-time location, pricing.', searchQuery: 'design uber system design interview' },
      { name: 'Design Rate Limiter', desc: 'Token bucket, sliding window, distributed rate limiting.', searchQuery: 'design rate limiter system design' },
      { name: 'Design Notification System', desc: 'Push notifications, email, SMS — multi-channel delivery.', searchQuery: 'design notification system interview' },
      { name: 'Design Search Engine', desc: 'Web crawling, indexing, ranking, query processing.', searchQuery: 'design search engine system design' },
      { name: 'Design E-commerce', desc: 'Product catalog, cart, checkout, inventory, payments.', searchQuery: 'design e-commerce system design interview' },
    ],
  },
  behavioral: {
    name: 'Behavioral Interview',
    icon: '💬',
    description: 'Prepare stories using the STAR method for behavioral rounds',
    patterns: [
      { name: 'Tell me about yourself', desc: 'Structured intro: background → skills → current focus → why this role.', searchQuery: 'tell me about yourself interview answer' },
      { name: 'Why this company?', desc: 'Research company values, products, and connect to your experience.', searchQuery: 'why this company interview answer' },
      { name: 'Biggest challenge?', desc: 'Use STAR: describe a real technical/team challenge you overcame.', searchQuery: 'biggest challenge interview STAR method' },
      { name: 'Conflict with teammate?', desc: 'Show communication skills, compromise, and professional resolution.', searchQuery: 'conflict with teammate interview answer' },
      { name: 'Leadership example', desc: 'Times you led a project, mentored someone, or made a key decision.', searchQuery: 'leadership example interview answer' },
      { name: 'Failure / Mistake', desc: 'Show growth mindset — what went wrong, what you learned.', searchQuery: 'failure mistake interview answer' },
      { name: 'Strengths & Weaknesses', desc: 'Genuine strengths with evidence. Weaknesses with improvement plans.', searchQuery: 'strengths weaknesses interview answer' },
      { name: 'Where do you see yourself in 5 years?', desc: 'Show ambition aligned with company growth and your career goals.', searchQuery: 'where do you see yourself 5 years interview' },
    ],
  },
  technical: {
    name: 'Technical Concepts',
    icon: '🧠',
    description: 'Key concepts frequently asked in technical interviews',
    patterns: [
      { name: 'REST vs GraphQL', desc: 'Compare API design approaches, tradeoffs, use cases.', searchQuery: 'REST vs GraphQL interview explained' },
      { name: 'SQL vs NoSQL', desc: 'When to use relational vs document/key-value databases.', searchQuery: 'SQL vs NoSQL interview explained' },
      { name: 'CAP Theorem', desc: 'Consistency, Availability, Partition tolerance — pick 2.', searchQuery: 'CAP theorem explained interview' },
      { name: 'ACID vs BASE', desc: 'Transaction guarantees in SQL (ACID) vs NoSQL (BASE).', searchQuery: 'ACID vs BASE database interview' },
      { name: 'Microservices vs Monolith', desc: 'Architecture tradeoffs, when to use which.', searchQuery: 'microservices vs monolith interview' },
      { name: 'OAuth2 & JWT', desc: 'Authentication/authorization flows, token-based security.', searchQuery: 'OAuth2 JWT authentication explained interview' },
      { name: 'Docker & Kubernetes', desc: 'Containerization, orchestration, deployment strategies.', searchQuery: 'Docker Kubernetes interview questions' },
      { name: 'CI/CD Pipeline', desc: 'Continuous integration and delivery, deployment automation.', searchQuery: 'CI CD pipeline interview explained' },
      { name: 'Time & Space Complexity', desc: 'Big-O analysis — fundamental for coding interviews.', searchQuery: 'Big-O time space complexity explained' },
      { name: 'Concurrency & Threading', desc: 'Threads, locks, deadlocks, async patterns.', searchQuery: 'concurrency threading interview questions' },
    ],
  },
};

export default function InterviewPrep() {
  const { roleData, preferredLanguage, changeLanguage, SUPPORTED_LANGUAGES } = useRole();
  const [activeSection, setActiveSection] = useState('coding');
  const [expandedPattern, setExpandedPattern] = useState(null);
  const [patternLang, setPatternLang] = useState(preferredLanguage || 'python');
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);

  function handleOpenSearch(query) {
    const langName = LANGUAGE_METADATA[patternLang]?.name || 'Python';
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' in ' + langName)}`;
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  }

  function handleOpenGoogle(query) {
    const langName = LANGUAGE_METADATA[patternLang]?.name || '';
    const url = `https://www.google.com/search?q=${encodeURIComponent(query + ' in ' + langName)}`;
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  }

  function handleCopyCode(code, idx) {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  }

  const section = INTERVIEW_SECTIONS[activeSection];
  const activeLangMeta = LANGUAGE_METADATA[patternLang] || LANGUAGE_METADATA.python;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-header__title">🎤 Interview Preparation</h1>
        <p className="page-header__subtitle">
          Master coding patterns, system design, and behavioral questions
          {roleData && ` for ${roleData.name}`}
        </p>
      </div>

      <div className="page-body">
        {/* Section Tabs */}
        <div className="tabs" style={{ marginBottom: 'var(--space-5)' }}>
          {Object.entries(INTERVIEW_SECTIONS).map(([key, sec]) => (
            <button
              key={key}
              className={`tab ${activeSection === key ? 'tab--active' : ''}`}
              onClick={() => { setActiveSection(key); setExpandedPattern(null); }}
            >
              {sec.icon} {sec.name}
            </button>
          ))}
        </div>

        {/* Section Content */}
        <div className="chart-card">
          <div className="chart-card__header">
            <div>
              <div className="chart-card__title">{section.icon} {section.name}</div>
              <div className="chart-card__subtitle">{section.description}</div>
            </div>

            {/* Language Selector for Coding section */}
            {activeSection === 'coding' && (
              <div className="interview-lang-selector">
                <span className="interview-lang-label">Language:</span>
                <div className="interview-lang-pills">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                      key={lang.key}
                      className={`interview-lang-pill ${patternLang === lang.key ? 'interview-lang-pill--active' : ''}`}
                      onClick={() => setPatternLang(lang.key)}
                      title={`View patterns in ${lang.name}`}
                    >
                      <span>{lang.icon}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="interview-patterns">
            {section.patterns.map((pattern, idx) => {
              const isExpanded = expandedPattern === idx;
              const templateCode = PATTERN_TEMPLATES[pattern.name]?.[patternLang] || null;

              return (
                <div key={idx} className={`interview-pattern ${isExpanded ? 'interview-pattern--expanded' : ''}`}>
                  <div
                    className="interview-pattern__header"
                    onClick={() => setExpandedPattern(isExpanded ? null : idx)}
                  >
                    <div className="interview-pattern__name">
                      <span className="interview-pattern__number">{idx + 1}</span>
                      {pattern.name}
                    </div>
                    <span className={`interview-pattern__arrow ${isExpanded ? 'interview-pattern__arrow--open' : ''}`}>▾</span>
                  </div>

                  {isExpanded && (
                    <div className="interview-pattern__body animate-fade-in">
                      <p className="interview-pattern__desc">{pattern.desc}</p>

                      {/* Code Template Box (if available for this pattern) */}
                      {templateCode && (
                        <div className="interview-pattern__code-box">
                          <div className="interview-pattern__code-header">
                            <span>{activeLangMeta.icon} {pattern.name} Template ({activeLangMeta.badge}):</span>
                            <button
                              className="code-copy-btn"
                              onClick={() => handleCopyCode(templateCode, idx)}
                            >
                              {copiedCodeIndex === idx ? '✓ Copied!' : '📋 Copy Template'}
                            </button>
                          </div>
                          <pre className="code-pre">
                            <code>{templateCode}</code>
                          </pre>
                        </div>
                      )}

                      <div className="interview-pattern__actions">
                        <button className="interview-pattern__btn interview-pattern__btn--yt" onClick={() => handleOpenSearch(pattern.searchQuery)}>
                          📹 YouTube ({activeLangMeta.name})
                        </button>
                        <button className="interview-pattern__btn interview-pattern__btn--google" onClick={() => handleOpenGoogle(pattern.name + ' interview guide')}>
                          🌐 Google Guide
                        </button>
                        <button className="interview-pattern__btn interview-pattern__btn--lc" onClick={() => handleOpenSearch(pattern.name + ' leetcode problems')}>
                          🟠 LeetCode Problems
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips Card */}
        <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-card__header">
            <div className="chart-card__title">💡 Interview Tips</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
            {[
              { emoji: '🗣️', title: 'Think Out Loud', desc: 'Always explain your thought process. Interviewers want to see how you think, not just the answer.' },
              { emoji: '📝', title: 'Clarify First', desc: 'Ask clarifying questions before coding. Confirm inputs, outputs, edge cases, and constraints.' },
              { emoji: '🧪', title: 'Test Your Code', desc: 'Walk through your solution with examples. Check edge cases. Show attention to detail.' },
              { emoji: '⏰', title: 'Time Management', desc: 'Spend 5 min understanding, 20 min coding, 5 min testing. Don\'t get stuck — ask for hints.' },
              { emoji: '🔄', title: 'Brute Force First', desc: 'Start with the simplest solution, then optimize. Show you can iterate on your approach.' },
              { emoji: '📚', title: 'Mock Interviews', desc: 'Practice with friends or use platforms like Pramp, Interviewing.io. Real practice beats theory.' },
            ].map((tip, i) => (
              <div key={i} style={{
                padding: 'var(--space-4)', background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius)', display: 'flex', gap: 'var(--space-3)',
              }}>
                <span style={{ fontSize: '28px' }}>{tip.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px' }}>{tip.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{tip.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
