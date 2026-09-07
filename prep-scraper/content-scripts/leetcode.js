// LeetCode Content Script — Scrapes profile stats and submission data
(function () {
  'use strict';

  const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';
  let hasScraped = false;

  // Auto-scrape when on profile page
  if (window.location.pathname.includes('/u/') || window.location.pathname === '/') {
    setTimeout(() => scrapeProfileFromPage(), 3000);
  }

  let lastReportedProblem = null;

  // Detect when user solves a problem (submission accepted)
  const observer = new MutationObserver(debounce(() => {
    detectAcceptedSubmission();
  }, 1000));

  observer.observe(document.body, { childList: true, subtree: true });

  // ─── Main scrape function ───
  async function scrapeProfileFromPage() {
    if (hasScraped) return;

    try {
      // Try to get username from the page
      const username = extractUsername();
      if (!username) return;

      console.log('[PrepScraper] Scraping LeetCode for:', username);

      // Use LeetCode's internal GraphQL to get stats
      const stats = await fetchUserStats(username);
      if (stats) {
        hasScraped = true;

        await sendToBackground('PLATFORM_STATS', {
          platform: 'leetcode',
          username: username,
          stats_json: stats,
        });

        console.log('[PrepScraper] LeetCode stats synced:', stats);
      }
    } catch (err) {
      console.error('[PrepScraper] LeetCode scrape error:', err);
    }
  }

  // ─── Extract username ───
  function extractUsername() {
    // From URL (/u/username/)
    const urlMatch = window.location.pathname.match(/\/u\/([^/]+)/);
    if (urlMatch) return urlMatch[1];

    // From profile dropdown or nav
    const profileLink = document.querySelector('a[href*="/u/"]');
    if (profileLink) {
      const match = profileLink.href.match(/\/u\/([^/]+)/);
      if (match) return match[1];
    }

    // From stored setting
    return null;
  }

  // ─── Fetch user stats via GraphQL ───
  async function fetchUserStats(username) {
    try {
      const response = await fetch(LEETCODE_GRAPHQL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query userProfileUserQuestionProgressV2($userSlug: String!) {
              userProfileUserQuestionProgressV2(userSlug: $userSlug) {
                numAcceptedQuestions { difficulty count }
                numFailedQuestions { difficulty count }
                numUntouchedQuestions { difficulty count }
              }
            }
          `,
          variables: { userSlug: username },
        }),
      });

      const data = await response.json();
      const progress = data?.data?.userProfileUserQuestionProgressV2;

      if (!progress) return null;

      const accepted = {};
      progress.numAcceptedQuestions.forEach(q => {
        accepted[q.difficulty.toLowerCase()] = q.count;
      });

      return {
        totalSolved: (accepted.easy || 0) + (accepted.medium || 0) + (accepted.hard || 0),
        easy: accepted.easy || 0,
        medium: accepted.medium || 0,
        hard: accepted.hard || 0,
        username: username,
      };
    } catch (err) {
      console.error('[PrepScraper] GraphQL error:', err);
      return null;
    }
  }

  // ─── Detect accepted submission ───
  function detectAcceptedSubmission() {
    // Look for "Accepted" status on submission page
    const acceptedEl = document.querySelector('[data-e2e-locator="submission-result"]');
    if (acceptedEl && acceptedEl.textContent.toLowerCase().includes('accepted')) {
      const problemName = extractProblemName();
      const difficulty = extractDifficulty();
      const category = extractCategory();

      if (problemName && problemName !== lastReportedProblem) {
        lastReportedProblem = problemName;
        sendToBackground('PROBLEM_SOLVED', {
          platform: 'leetcode',
          problem_name: problemName,
          problem_url: window.location.href,
          difficulty: difficulty,
          category: category,
          status: 'solved',
        });
        console.log('[PrepScraper] Problem solved:', problemName);
      }
    }
  }

  function extractProblemName() {
    // From page title or breadcrumb
    const titleEl = document.querySelector('[data-cy="question-title"]') ||
                    document.querySelector('.text-title-large') ||
                    document.querySelector('div[class*="title"]');
    if (titleEl) return titleEl.textContent.trim();

    // Fallback: from document title
    const title = document.title.replace(' - LeetCode', '').trim();
    return title || 'Unknown Problem';
  }

  function extractDifficulty() {
    const el = document.querySelector('div[class*="difficulty"]') ||
               document.querySelector('[diff]');
    if (!el) return 'medium';
    const text = el.textContent.toLowerCase();
    if (text.includes('easy')) return 'easy';
    if (text.includes('hard')) return 'hard';
    return 'medium';
  }

  function extractCategory() {
    // Try to get from tags
    const tags = document.querySelectorAll('a[class*="tag"]');
    if (tags.length > 0) return tags[0].textContent.trim().toLowerCase().replace(/\s+/g, '_');
    return 'uncategorized';
  }

  // Global trigger for popup sync
  window.triggerScrape = scrapeProfileFromPage;

  console.log('[PrepScraper] LeetCode content script loaded');
})();
