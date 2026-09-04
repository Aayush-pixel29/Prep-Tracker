// Common utilities shared across all content scripts

/**
 * Send scraped data to the service worker
 */
function sendToBackground(type, data) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type, data }, (response) => {
      resolve(response);
    });
  });
}

/**
 * Wait for an element to appear in the DOM
 */
function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);

    const observer = new MutationObserver((mutations, obs) => {
      const el = document.querySelector(selector);
      if (el) {
        obs.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
}

/**
 * Extract text content safely
 */
function safeText(selector, context = document) {
  const el = context.querySelector(selector);
  return el ? el.textContent.trim() : '';
}

/**
 * Extract number from text
 */
function extractNumber(text) {
  const match = text.match(/[\d,]+/);
  return match ? parseInt(match[0].replace(/,/g, '')) : 0;
}

/**
 * Debounce function to prevent excessive scraping
 */
function debounce(fn, delay = 2000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Listen for trigger from popup
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TRIGGER_SCRAPE') {
    if (typeof triggerScrape === 'function') {
      triggerScrape();
    }
    sendResponse({ success: true });
  }
});

console.log('[PrepScraper] Common utilities loaded');
