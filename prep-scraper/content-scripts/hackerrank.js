// HackerRank Content Script — Scrapes profile and challenge data
(function () {
  'use strict';

  // Auto-scrape on profile or dashboard
  if (window.location.pathname.includes('/profile') || window.location.pathname.includes('/dashboard')) {
    setTimeout(() => scrapeHackerRank(), 3000);
  }

  // Detect challenge completion
  if (window.location.pathname.includes('/challenges/')) {
    const observer = new MutationObserver(debounce(() => {
      detectChallengeCompletion();
    }, 1000));
    observer.observe(document.body, { childList: true, subtree: true });
  }

  async function scrapeHackerRank() {
    console.log('[PrepScraper] Scraping HackerRank...');

    try {
      // Extract profile stats from the page
      const stats = {};

      // Badges
      const badges = document.querySelectorAll('[class*="badge"], [class*="star"]');
      stats.badges = badges.length;

      // Score/points
      const scoreEl = document.querySelector('[class*="score"], [class*="points"], [class*="hackos"]');
      if (scoreEl) stats.score = extractNumber(scoreEl.textContent);

      // Problems solved by domain
      const domains = {};
      const domainCards = document.querySelectorAll('[class*="domain"], [class*="track"], [class*="skill"]');
      domainCards.forEach(card => {
        const name = safeText('h2, h3, [class*="name"], [class*="title"]', card);
        const count = extractNumber(safeText('[class*="count"], [class*="solved"], [class*="score"]', card));
        if (name) domains[name] = count;
      });
      stats.domains = domains;

      // Certifications
      const certs = document.querySelectorAll('[class*="certification"], [class*="certificate"]');
      stats.certifications = certs.length;

      // Total problems solved
      const totalEl = document.querySelector('[class*="total-solved"], [class*="submissions"]');
      stats.totalSolved = totalEl ? extractNumber(totalEl.textContent) : 0;

      await sendToBackground('PLATFORM_STATS', {
        platform: 'hackerrank',
        username: extractHackerRankUsername(),
        stats_json: stats,
      });

      console.log('[PrepScraper] HackerRank stats synced:', stats);
    } catch (err) {
      console.error('[PrepScraper] HackerRank scrape error:', err);
    }
  }

  function detectChallengeCompletion() {
    // Look for success messages
    const successEl = document.querySelector('[class*="congrats"], [class*="success"], [class*="correct"]');
    const resultEl = document.querySelector('.submission-status');

    if ((successEl || (resultEl && resultEl.textContent.toLowerCase().includes('accepted')))) {
      const name = document.querySelector('h1, .challenge-name, [class*="title"]')?.textContent.trim() || 'Unknown';
      const category = window.location.pathname.split('/')[2] || 'uncategorized';

      sendToBackground('PROBLEM_SOLVED', {
        platform: 'hackerrank',
        problem_name: name,
        problem_url: window.location.href,
        difficulty: 'medium',
        category: category.toLowerCase().replace(/-/g, '_'),
        status: 'solved',
      });

      console.log('[PrepScraper] HackerRank challenge solved:', name);
    }
  }

  function extractHackerRankUsername() {
    const urlMatch = window.location.pathname.match(/\/profile\/([^/]+)/);
    if (urlMatch) return urlMatch[1];
    const el = document.querySelector('[class*="username"], .profile-username');
    return el ? el.textContent.trim() : 'unknown';
  }

  window.triggerScrape = scrapeHackerRank;
  console.log('[PrepScraper] HackerRank content script loaded');
})();
