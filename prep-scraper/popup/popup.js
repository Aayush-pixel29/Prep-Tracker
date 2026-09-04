// PrepScraper Popup Logic
document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('connectionStatus');
  const todayEl = document.getElementById('todayProblems');
  const streakEl = document.getElementById('streakCount');
  const totalEl = document.getElementById('totalCount');
  const goalProgressEl = document.getElementById('goalProgress');
  const goalBarEl = document.getElementById('goalBar');
  const platformsEl = document.getElementById('platformsList');

  // Check connection & load stats
  try {
    const healthResponse = await sendMessage({ type: 'HEALTH_CHECK' });
    if (healthResponse.success) {
      statusEl.className = 'popup__status popup__status--connected';
      statusEl.textContent = '● Connected';
    } else {
      throw new Error('Not connected');
    }
  } catch {
    statusEl.className = 'popup__status popup__status--disconnected';
    statusEl.textContent = '● Offline';
  }

  // Load today's stats
  try {
    const todayResponse = await sendMessage({ type: 'GET_TODAY_STATS' });
    if (todayResponse.success && todayResponse.data) {
      todayEl.textContent = todayResponse.data.problems_solved || 0;
    } else {
      todayEl.textContent = '0';
    }
  } catch {
    todayEl.textContent = '0';
  }

  // Load streak
  try {
    const streakResponse = await sendMessage({ type: 'GET_STREAK' });
    if (streakResponse.success && streakResponse.data) {
      const data = streakResponse.data;
      streakEl.textContent = data.currentStreak || 0;
      totalEl.textContent = data.totalProblems || 0;

      const goal = data.goalProblems || 3;
      const todayCount = parseInt(todayEl.textContent) || 0;
      goalProgressEl.textContent = `${todayCount}/${goal}`;
      goalBarEl.style.width = `${Math.min((todayCount / goal) * 100, 100)}%`;
    } else {
      streakEl.textContent = '0';
      totalEl.textContent = '0';
    }
  } catch {
    streakEl.textContent = '0';
    totalEl.textContent = '0';
  }

  // Load platform status
  const platforms = [
    { key: 'leetcode', name: 'LeetCode', icon: 'LC' },
    { key: 'neetcode', name: 'NeetCode', icon: 'NC' },
    { key: 'hackerrank', name: 'HackerRank', icon: 'HR' },
    { key: 'gfg', name: 'GeeksForGeeks', icon: 'GFG' },
  ];

  for (const platform of platforms) {
    const result = await chrome.storage.local.get([`lastScrape_${platform.key}`]);
    const lastScrape = result[`lastScrape_${platform.key}`];
    const lastSync = lastScrape ? new Date(lastScrape.timestamp).toLocaleString() : 'Never synced';

    platformsEl.innerHTML += `
      <div class="popup__platform">
        <div class="popup__platform-icon popup__platform-icon--${platform.key}">${platform.icon}</div>
        <div class="popup__platform-info">
          <div class="popup__platform-name">${platform.name}</div>
          <div class="popup__platform-status">${lastSync}</div>
        </div>
      </div>
    `;
  }

  // Sync button
  document.getElementById('syncBtn').addEventListener('click', async () => {
    const btn = document.getElementById('syncBtn');
    btn.textContent = '⏳ Syncing...';
    btn.disabled = true;

    // Trigger content script scrape on active tab
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        await chrome.tabs.sendMessage(tab.id, { type: 'TRIGGER_SCRAPE' });
      }
    } catch (err) {
      console.log('No content script on this tab');
    }

    setTimeout(() => {
      btn.textContent = '✅ Synced!';
      setTimeout(() => {
        btn.textContent = '🔄 Sync Now';
        btn.disabled = false;
      }, 1500);
    }, 1000);
  });

  // Open dashboard
  document.getElementById('openAppBtn').addEventListener('click', () => {
    // Try to focus existing PrepTracker window
    chrome.tabs.create({ url: 'http://localhost:5173' });
  });

  // Options link
  document.getElementById('optionsLink').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
});

function sendMessage(message) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, (response) => {
      resolve(response || { success: false });
    });
  });
}
