// PrepScraper Service Worker — Background process
const API_BASE = 'http://localhost:3847';

// ─── Context Menu ───
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'save-to-preptracker',
    title: 'Save to PrepTracker',
    contexts: ['page', 'link'],
  });

  // Set default settings
  chrome.storage.local.get(['apiPort', 'autoSync'], (result) => {
    if (!result.apiPort) {
      chrome.storage.local.set({
        apiPort: '3847',
        autoSync: true,
        leetcodeUsername: '',
        syncInterval: 30, // minutes
      });
    }
  });

  // Set up periodic sync alarm
  chrome.alarms.create('periodic-sync', { periodInMinutes: 30 });

  console.log('[PrepScraper] Extension installed and configured');
});

// ─── Handle context menu clicks ───
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'save-to-preptracker') {
    const url = info.linkUrl || info.pageUrl;
    const title = tab.title || 'Untitled Page';

    sendToDesktopApp('/api/problems', {
      platform: 'manual',
      problem_name: title,
      problem_url: url,
      difficulty: 'medium',
      category: 'uncategorized',
      status: 'solved',
      notes: 'Saved via Chrome extension context menu',
    });
  }
});

// ─── Handle messages from content scripts ───
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SCRAPED_DATA') {
    handleScrapedData(message.data);
    sendResponse({ success: true });
  }

  if (message.type === 'PROBLEM_SOLVED') {
    sendToDesktopApp('/api/problems', message.data);
    updateBadge();
    sendResponse({ success: true });
  }

  if (message.type === 'PLATFORM_STATS') {
    sendToDesktopApp('/api/platform-stats', message.data);
    sendResponse({ success: true });
  }

  if (message.type === 'BULK_SYNC') {
    sendToDesktopApp('/api/sync/bulk', message.data);
    sendResponse({ success: true });
  }

  if (message.type === 'GET_TODAY_STATS') {
    fetchFromDesktopApp('/api/daily-logs/today')
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true; // Keep channel open for async response
  }

  if (message.type === 'GET_STREAK') {
    fetchFromDesktopApp('/api/streaks')
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === 'HEALTH_CHECK') {
    fetchFromDesktopApp('/api/health')
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }
});

// ─── Periodic sync alarm ───
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'periodic-sync') {
    updateBadge();
  }
});

// ─── Helper functions ───
async function getApiBase() {
  const result = await chrome.storage.local.get(['apiPort']);
  const port = result.apiPort || '3847';
  return `http://localhost:${port}`;
}

async function sendToDesktopApp(endpoint, data) {
  try {
    const base = await getApiBase();
    const response = await fetch(`${base}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    console.log(`[PrepScraper] Sent to ${endpoint}:`, result);
    return result;
  } catch (err) {
    console.error(`[PrepScraper] Failed to send to ${endpoint}:`, err.message);
    // Store locally for later sync
    const pending = (await chrome.storage.local.get(['pendingSync'])).pendingSync || [];
    pending.push({ endpoint, data, timestamp: Date.now() });
    await chrome.storage.local.set({ pendingSync: pending });
    throw err;
  }
}

async function fetchFromDesktopApp(endpoint) {
  const base = await getApiBase();
  const response = await fetch(`${base}${endpoint}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function handleScrapedData(data) {
  // Store latest scrape in local storage
  await chrome.storage.local.set({
    [`lastScrape_${data.platform}`]: {
      data: data,
      timestamp: Date.now(),
    },
  });

  // Send to desktop app
  if (data.problems && data.problems.length > 0) {
    await sendToDesktopApp('/api/sync/bulk', data);
  }

  if (data.stats) {
    await sendToDesktopApp('/api/platform-stats', {
      platform: data.platform,
      username: data.username,
      stats_json: data.stats,
    });
  }
}

async function updateBadge() {
  try {
    const data = await fetchFromDesktopApp('/api/daily-logs/today');
    const count = data.problems_solved || 0;
    chrome.action.setBadgeText({ text: count > 0 ? String(count) : '' });
    chrome.action.setBadgeBackgroundColor({ color: '#4F6EF7' });
  } catch {
    chrome.action.setBadgeText({ text: '' });
  }
}
