import React, { useState, useEffect, useMemo } from 'react';
import { useGamification } from '../utils/GamificationContext';

const PROBLEM_SHEETS = {
  neetcode150: {
    name: 'NeetCode 150',
    icon: '⚡',
    badge: 'Core Pattern Mastery',
    description: 'The golden standard of 150 essential DSA pattern problems categorized by data structures.',
  },
  striver_sde: {
    name: 'Striver SDE Sheet',
    icon: '🚀',
    badge: 'FAANG / Tier-1 Ready',
    description: '180 top coding interview problems curated by Raj Vikramaditya for SDE I and SDE II rounds.',
  },
  blind75: {
    name: 'Blind 75',
    icon: '🎯',
    badge: 'High-Yield Essentials',
    description: 'The original concise 75 problem list covering all major algorithmic patterns for time-crunched prep.',
  },
};

const PRACTICE_PROBLEMS = [
  // Arrays & Hashing
  { id: 'p1', title: 'Two Sum', sheet: 'neetcode150', topic: 'Arrays & Hashing', difficulty: 'Easy', companies: ['Google', 'Meta', 'Amazon', 'Apple'], url: 'https://leetcode.com/problems/two-sum/' },
  { id: 'p2', title: 'Valid Anagram', sheet: 'neetcode150', topic: 'Arrays & Hashing', difficulty: 'Easy', companies: ['Amazon', 'Uber'], url: 'https://leetcode.com/problems/valid-anagram/' },
  { id: 'p3', title: 'Group Anagrams', sheet: 'neetcode150', topic: 'Arrays & Hashing', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], url: 'https://leetcode.com/problems/group-anagrams/' },
  { id: 'p4', title: 'Top K Frequent Elements', sheet: 'neetcode150', topic: 'Arrays & Hashing', difficulty: 'Medium', companies: ['Meta', 'Amazon'], url: 'https://leetcode.com/problems/top-k-frequent-elements/' },
  { id: 'p5', title: 'Product of Array Except Self', sheet: 'blind75', topic: 'Arrays & Hashing', difficulty: 'Medium', companies: ['Amazon', 'Meta', 'Apple'], url: 'https://leetcode.com/problems/product-of-array-except-self/' },
  { id: 'p6', title: 'Longest Consecutive Sequence', sheet: 'blind75', topic: 'Arrays & Hashing', difficulty: 'Medium', companies: ['Google', 'Spotify'], url: 'https://leetcode.com/problems/longest-consecutive-sequence/' },

  // Two Pointers
  { id: 'p7', title: 'Valid Palindrome', sheet: 'neetcode150', topic: 'Two Pointers', difficulty: 'Easy', companies: ['Meta', 'Microsoft'], url: 'https://leetcode.com/problems/valid-palindrome/' },
  { id: 'p8', title: 'Two Sum II - Input Array Is Sorted', sheet: 'neetcode150', topic: 'Two Pointers', difficulty: 'Medium', companies: ['Amazon'], url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
  { id: 'p9', title: '3Sum', sheet: 'blind75', topic: 'Two Pointers', difficulty: 'Medium', companies: ['Meta', 'Amazon', 'Google'], url: 'https://leetcode.com/problems/3sum/' },
  { id: 'p10', title: 'Container With Most Water', sheet: 'striver_sde', topic: 'Two Pointers', difficulty: 'Medium', companies: ['Amazon', 'Google'], url: 'https://leetcode.com/problems/container-with-most-water/' },
  { id: 'p11', title: 'Trapping Rain Water', sheet: 'striver_sde', topic: 'Two Pointers', difficulty: 'Hard', companies: ['Google', 'Meta', 'Amazon'], url: 'https://leetcode.com/problems/trapping-rain-water/' },

  // Sliding Window
  { id: 'p12', title: 'Best Time to Buy and Sell Stock', sheet: 'blind75', topic: 'Sliding Window', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Google'], url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
  { id: 'p13', title: 'Longest Substring Without Repeating Characters', sheet: 'neetcode150', topic: 'Sliding Window', difficulty: 'Medium', companies: ['Amazon', 'Meta', 'Microsoft'], url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
  { id: 'p14', title: 'Longest Repeating Character Replacement', sheet: 'neetcode150', topic: 'Sliding Window', difficulty: 'Medium', companies: ['Uber', 'Google'], url: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
  { id: 'p15', title: 'Minimum Window Substring', sheet: 'striver_sde', topic: 'Sliding Window', difficulty: 'Hard', companies: ['Meta', 'LinkedIn', 'Uber'], url: 'https://leetcode.com/problems/minimum-window-substring/' },

  // Stack & Binary Search
  { id: 'p16', title: 'Valid Parentheses', sheet: 'blind75', topic: 'Stack', difficulty: 'Easy', companies: ['Amazon', 'Meta', 'Google'], url: 'https://leetcode.com/problems/valid-parentheses/' },
  { id: 'p17', title: 'Daily Temperatures', sheet: 'neetcode150', topic: 'Stack', difficulty: 'Medium', companies: ['Meta', 'Amazon'], url: 'https://leetcode.com/problems/daily-temperatures/' },
  { id: 'p18', title: 'Largest Rectangle in Histogram', sheet: 'striver_sde', topic: 'Stack', difficulty: 'Hard', companies: ['Google', 'Amazon'], url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
  { id: 'p19', title: 'Binary Search', sheet: 'neetcode150', topic: 'Binary Search', difficulty: 'Easy', companies: ['Apple', 'Microsoft'], url: 'https://leetcode.com/problems/binary-search/' },
  { id: 'p20', title: 'Search in Rotated Sorted Array', sheet: 'blind75', topic: 'Binary Search', difficulty: 'Medium', companies: ['Meta', 'Amazon', 'Google'], url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
  { id: 'p21', title: 'Median of Two Sorted Arrays', sheet: 'striver_sde', topic: 'Binary Search', difficulty: 'Hard', companies: ['Google', 'Microsoft', 'Goldman Sachs'], url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },

  // Linked List & Trees
  { id: 'p22', title: 'Reverse Linked List', sheet: 'blind75', topic: 'Linked List', difficulty: 'Easy', companies: ['Amazon', 'Microsoft', 'Apple'], url: 'https://leetcode.com/problems/reverse-linked-list/' },
  { id: 'p23', title: 'Merge Two Sorted Lists', sheet: 'blind75', topic: 'Linked List', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
  { id: 'p24', title: 'Linked List Cycle', sheet: 'neetcode150', topic: 'Linked List', difficulty: 'Easy', companies: ['Amazon', 'Spotify'], url: 'https://leetcode.com/problems/linked-list-cycle/' },
  { id: 'p25', title: 'Invert Binary Tree', sheet: 'blind75', topic: 'Trees', difficulty: 'Easy', companies: ['Google', 'Amazon'], url: 'https://leetcode.com/problems/invert-binary-tree/' },
  { id: 'p26', title: 'Maximum Depth of Binary Tree', sheet: 'neetcode150', topic: 'Trees', difficulty: 'Easy', companies: ['LinkedIn', 'Apple'], url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
  { id: 'p27', title: 'Validate Binary Search Tree', sheet: 'striver_sde', topic: 'Trees', difficulty: 'Medium', companies: ['Meta', 'Amazon', 'Microsoft'], url: 'https://leetcode.com/problems/validate-binary-search-tree/' },
  { id: 'p28', title: 'Binary Tree Level Order Traversal', sheet: 'blind75', topic: 'Trees', difficulty: 'Medium', companies: ['Amazon', 'Meta'], url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },

  // Dynamic Programming & Graphs
  { id: 'p29', title: 'Climbing Stairs', sheet: 'blind75', topic: 'Dynamic Programming', difficulty: 'Easy', companies: ['Amazon', 'Adobe'], url: 'https://leetcode.com/problems/climbing-stairs/' },
  { id: 'p30', title: 'Coin Change', sheet: 'neetcode150', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Amazon', 'Meta', 'Google'], url: 'https://leetcode.com/problems/coin-change/' },
  { id: 'p31', title: 'Longest Increasing Subsequence', sheet: 'striver_sde', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Google', 'Microsoft'], url: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
  { id: 'p32', title: 'Number of Islands', sheet: 'blind75', topic: 'Graphs', difficulty: 'Medium', companies: ['Amazon', 'Meta', 'Google', 'Microsoft'], url: 'https://leetcode.com/problems/number-of-islands/' },
  { id: 'p33', title: 'Course Schedule', sheet: 'striver_sde', topic: 'Graphs', difficulty: 'Medium', companies: ['Google', 'Amazon', 'Uber'], url: 'https://leetcode.com/problems/course-schedule/' },
];

export default function PracticeArena() {
  const { addXP } = useGamification();
  const [selectedSheet, setSelectedSheet] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [completedProblems, setCompletedProblems] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('preptracker_completed_problems');
    if (saved) {
      try { setCompletedProblems(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  function toggleProblem(id, title) {
    const updated = { ...completedProblems, [id]: !completedProblems[id] };
    setCompletedProblems(updated);
    localStorage.setItem('preptracker_completed_problems', JSON.stringify(updated));

    if (updated[id]) {
      addXP(100, `Solved Problem: ${title}`);
    }
  }

  function handleOpenLink(url) {
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  }

  // All distinct topics
  const allTopics = useMemo(() => {
    return Array.from(new Set(PRACTICE_PROBLEMS.map(p => p.topic)));
  }, []);

  // Filtered problems
  const filteredProblems = useMemo(() => {
    return PRACTICE_PROBLEMS.filter(p => {
      const matchSheet = selectedSheet === 'all' || p.sheet === selectedSheet;
      const matchDiff = selectedDifficulty === 'all' || p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      const matchTopic = selectedTopic === 'all' || p.topic === selectedTopic;
      const matchSearch = !searchTerm || p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.companies.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchSheet && matchDiff && matchTopic && matchSearch;
    });
  }, [selectedSheet, selectedDifficulty, selectedTopic, searchTerm]);

  const solvedCount = Object.values(completedProblems).filter(Boolean).length;
  const totalCount = PRACTICE_PROBLEMS.length;
  const overallProgress = Math.round((solvedCount / totalCount) * 100);

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h1 className="page-header__title">🎯 Unified Practice Arena & Problem Sheets</h1>
            <p className="page-header__subtitle">
              NeetCode 150 • Striver SDE Sheet • Blind 75 — Track and master canonical company interview problems
            </p>
          </div>
          <div className="practice-progress-badge">
            <span className="practice-progress-num">{solvedCount}/{totalCount}</span>
            <span className="practice-progress-pct">{overallProgress}% Solved</span>
          </div>
        </div>
      </div>

      <div className="page-body">
        {/* Sheet Selector Tabs */}
        <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
          <button
            className={`tab ${selectedSheet === 'all' ? 'tab--active' : ''}`}
            onClick={() => setSelectedSheet('all')}
          >
            📋 All Sheets
          </button>
          {Object.entries(PROBLEM_SHEETS).map(([key, sheet]) => (
            <button
              key={key}
              className={`tab ${selectedSheet === key ? 'tab--active' : ''}`}
              onClick={() => setSelectedSheet(key)}
            >
              <span>{sheet.icon}</span>
              <span>{sheet.name}</span>
            </button>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="practice-filter-bar">
          <input
            type="text"
            className="practice-search-input"
            placeholder="🔍 Search problems, company (e.g. Google, Meta)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <select
            className="practice-select"
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">🟢 Easy</option>
            <option value="medium">🟠 Medium</option>
            <option value="hard">🔴 Hard</option>
          </select>

          <select
            className="practice-select"
            value={selectedTopic}
            onChange={e => setSelectedTopic(e.target.value)}
          >
            <option value="all">All Topics</option>
            {allTopics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Problem List Table */}
        <div className="practice-table-container">
          <div className="practice-table-header">
            <span style={{ width: '40px' }}>Status</span>
            <span style={{ flex: 1.5 }}>Problem Name</span>
            <span style={{ width: '130px' }}>Topic</span>
            <span style={{ width: '90px' }}>Difficulty</span>
            <span style={{ flex: 1 }}>Target Companies</span>
            <span style={{ width: '130px', textAlign: 'right' }}>Solve</span>
          </div>

          <div className="practice-table-body">
            {filteredProblems.map((prob) => {
              const isDone = completedProblems[prob.id];
              return (
                <div key={prob.id} className={`practice-row ${isDone ? 'practice-row--done' : ''}`}>
                  <div style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      className="practice-checkbox"
                      checked={!!isDone}
                      onChange={() => toggleProblem(prob.id, prob.title)}
                    />
                  </div>

                  <div style={{ flex: 1.5, fontWeight: 600 }} className="practice-row-title">
                    <span className={isDone ? 'practice-title--done' : ''}>{prob.title}</span>
                  </div>

                  <div style={{ width: '130px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {prob.topic}
                  </div>

                  <div style={{ width: '90px' }}>
                    <span className={`badge badge--${prob.difficulty.toLowerCase()}`}>
                      {prob.difficulty}
                    </span>
                  </div>

                  <div style={{ flex: 1, display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {prob.companies.slice(0, 3).map((comp, idx) => (
                      <span key={idx} className="practice-company-tag">{comp}</span>
                    ))}
                  </div>

                  <div style={{ width: '130px', textAlign: 'right' }}>
                    <button
                      className="btn-practice-launch"
                      onClick={() => handleOpenLink(prob.url)}
                    >
                      ▶ Solve ↗
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
