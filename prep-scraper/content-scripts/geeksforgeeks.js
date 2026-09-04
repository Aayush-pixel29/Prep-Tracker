// GeeksForGeeks Content Script — Scrapes profile and problem data
(function () {
  'use strict';

  // Auto-scrape on profile or user pages
  if (window.location.pathname.includes('/user/') || window.location.pathname.includes('/profile/')) {
    setTimeout(() => scrapeGFG(), 3000);
  }

  // Detect problem submission
  if (window.location.pathname.includes('/problems/')) {
    const observer = new MutationObserver(debounce(() => {
      detectProblemSolved();
    }, 1000));
    observer.observe(document.body, { childList: true, subtree: true });
  }

  async function scrapeGFG() {
    console.log('[PrepScraper] Scraping GeeksForGeeks...');

    try {
      const stats = {};

      // Coding score
      const scoreEl = document.querySelector('[class*="score_card"], [class*="coding-score"], .scoreCard_head_left--score');
      if (scoreEl) stats.codingScore = extractNumber(scoreEl.textContent);

      // Problems solved
      const solvedEl = document.querySelector('[class*="solved"], [class*="problems_solved"]');
      if (solvedEl) stats.problemsSolved = extractNumber(solvedEl.textContent);

      // Monthly & overall scores
      const scoreCards = document.querySelectorAll('[class*="score"], [class*="rating"]');
      scoreCards.forEach(card => {
        const text = card.textContent;
        if (text.toLowerCase().includes('monthly')) {
          stats.monthlyScore = extractNumber(text);
        }
        if (text.toLowerCase().includes('overall')) {
          stats.overallScore = extractNumber(text);
        }
      });

      // Institution rank
      const rankEl = document.querySelector('[class*="rank"], [class*="institution"]');
      if (rankEl) stats.rank = extractNumber(rankEl.textContent);

      // Difficulty-wise problems
      const diffStats = {};
      const diffItems = document.querySelectorAll('[class*="difficulty"], [class*="level"]');
      diffItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes('school') || text.includes('basic')) diffStats.basic = extractNumber(text);
        else if (text.includes('easy')) diffStats.easy = extractNumber(text);
        else if (text.includes('medium')) diffStats.medium = extractNumber(text);
        else if (text.includes('hard')) diffStats.hard = extractNumber(text);
      });
      stats.byDifficulty = diffStats;

      // Streak
      const streakEl = document.querySelector('[class*="streak"], [class*="max_streak"]');
      if (streakEl) stats.streak = extractNumber(streakEl.textContent);

      await sendToBackground('PLATFORM_STATS', {
        platform: 'gfg',
        username: extractGFGUsername(),
        stats_json: stats,
      });

      console.log('[PrepScraper] GFG stats synced:', stats);
    } catch (err) {
      console.error('[PrepScraper] GFG scrape error:', err);
    }
  }

  function detectProblemSolved() {
    // Look for "Correct" or "Accepted" indicators
    const correctEl = document.querySelector('[class*="correct"], [class*="accepted"], .problems_header_description__t_Co');
    const resultEl = document.querySelector('#result_correct, .result-correct, [class*="solution-accepted"]');

    if (correctEl || resultEl) {
      const name = document.querySelector('h1, .problems_header_content__title, [class*="problem-title"]')?.textContent.trim() || 'Unknown';

      // Extract difficulty
      let difficulty = 'medium';
      const diffEl = document.querySelector('[class*="difficulty"], .problems_header_description');
      if (diffEl) {
        const text = diffEl.textContent.toLowerCase();
        if (text.includes('easy') || text.includes('basic') || text.includes('school')) difficulty = 'easy';
        else if (text.includes('hard')) difficulty = 'hard';
      }

      // Extract category from tags or breadcrumbs
      let category = 'uncategorized';
      const tags = document.querySelectorAll('.problems_tag_container a, [class*="tag"]');
      if (tags.length > 0) {
        category = tags[0].textContent.trim().toLowerCase().replace(/\s+/g, '_');
      }

      sendToBackground('PROBLEM_SOLVED', {
        platform: 'gfg',
        problem_name: name,
        problem_url: window.location.href,
        difficulty,
        category,
        status: 'solved',
      });

      console.log('[PrepScraper] GFG problem solved:', name);
    }
  }

  function extractGFGUsername() {
    const urlMatch = window.location.pathname.match(/\/user\/([^/]+)/);
    if (urlMatch) return urlMatch[1];
    return 'unknown';
  }

  window.triggerScrape = scrapeGFG;
  console.log('[PrepScraper] GeeksForGeeks content script loaded');
})();
