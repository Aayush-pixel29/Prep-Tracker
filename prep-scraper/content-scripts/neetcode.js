// NeetCode Content Script — Scrapes roadmap progress
(function () {
  'use strict';

  // Auto-scrape when on roadmap or practice page
  if (window.location.pathname.includes('/roadmap') || window.location.pathname.includes('/practice')) {
    setTimeout(() => scrapeNeetCode(), 3000);
  }

  async function scrapeNeetCode() {
    console.log('[PrepScraper] Scraping NeetCode roadmap...');

    try {
      // NeetCode stores progress in checkboxes on the roadmap
      const problems = [];
      const categories = {};

      // Find all problem rows — NeetCode uses table/list format
      const problemRows = document.querySelectorAll('tr, [class*="problem"], [class*="row"]');

      problemRows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"], svg[class*="check"], [class*="solved"]');
        const nameEl = row.querySelector('a[href*="leetcode"], a[href*="neetcode"], td:nth-child(2), [class*="name"]');
        const diffEl = row.querySelector('[class*="easy"], [class*="medium"], [class*="hard"], td:nth-child(3)');

        if (nameEl) {
          const name = nameEl.textContent.trim();
          const url = nameEl.href || '';
          const isSolved = checkbox && (
            checkbox.checked ||
            checkbox.classList.contains('solved') ||
            checkbox.getAttribute('data-solved') === 'true' ||
            row.classList.contains('solved') ||
            row.querySelector('[class*="check"]')
          );

          let difficulty = 'medium';
          if (diffEl) {
            const text = diffEl.textContent.toLowerCase();
            if (text.includes('easy')) difficulty = 'easy';
            else if (text.includes('hard')) difficulty = 'hard';
          }

          // Try to extract category from section headers
          const section = row.closest('[class*="section"], [class*="group"], [class*="category"]');
          const category = section ? (section.querySelector('h2, h3, [class*="title"]')?.textContent.trim() || 'uncategorized') : 'uncategorized';

          if (name && name.length > 1) {
            problems.push({
              platform: 'neetcode',
              problem_name: name,
              problem_url: url,
              difficulty,
              category: category.toLowerCase().replace(/\s+/g, '_'),
              status: isSolved ? 'solved' : 'not_attempted',
            });

            if (!categories[category]) categories[category] = { total: 0, solved: 0 };
            categories[category].total++;
            if (isSolved) categories[category].solved++;
          }
        }
      });

      // Also try parsing from the roadmap visual
      const roadmapNodes = document.querySelectorAll('[class*="node"], [class*="item"]');
      roadmapNodes.forEach(node => {
        const isCompleted = node.classList.contains('completed') ||
                           node.querySelector('[class*="complete"]') ||
                           node.style.backgroundColor?.includes('green');
        const name = node.textContent.trim();
        if (name && name.length > 2 && name.length < 80) {
          // Only add if not already found
          if (!problems.find(p => p.problem_name === name)) {
            problems.push({
              platform: 'neetcode',
              problem_name: name,
              problem_url: window.location.href,
              difficulty: 'medium',
              category: 'neetcode_roadmap',
              status: isCompleted ? 'solved' : 'not_attempted',
            });
          }
        }
      });

      const solvedProblems = problems.filter(p => p.status === 'solved');
      const totalCount = problems.length;
      const solvedCount = solvedProblems.length;

      // Send stats
      await sendToBackground('PLATFORM_STATS', {
        platform: 'neetcode',
        username: 'local',
        stats_json: {
          totalProblems: totalCount,
          solvedProblems: solvedCount,
          completionPercent: totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0,
          categories,
        },
      });

      // Send solved problems
      if (solvedProblems.length > 0) {
        await sendToBackground('BULK_SYNC', {
          platform: 'neetcode',
          problems: solvedProblems,
        });
      }

      console.log(`[PrepScraper] NeetCode: ${solvedCount}/${totalCount} problems synced`);
    } catch (err) {
      console.error('[PrepScraper] NeetCode scrape error:', err);
    }
  }

  window.triggerScrape = scrapeNeetCode;
  console.log('[PrepScraper] NeetCode content script loaded');
})();
