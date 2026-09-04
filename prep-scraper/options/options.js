// Options page logic
document.addEventListener('DOMContentLoaded', () => {
  // Load saved settings
  chrome.storage.local.get(
    ['apiPort', 'autoSync', 'syncInterval', 'leetcodeUsername', 'neetcodeUsername', 'hackerrankUsername', 'gfgUsername'],
    (result) => {
      document.getElementById('apiPort').value = result.apiPort || '3847';
      document.getElementById('autoSync').checked = result.autoSync !== false;
      document.getElementById('syncInterval').value = result.syncInterval || 30;
      document.getElementById('leetcodeUsername').value = result.leetcodeUsername || '';
      document.getElementById('neetcodeUsername').value = result.neetcodeUsername || '';
      document.getElementById('hackerrankUsername').value = result.hackerrankUsername || '';
      document.getElementById('gfgUsername').value = result.gfgUsername || '';
    }
  );

  // Save settings
  document.getElementById('saveBtn').addEventListener('click', () => {
    const settings = {
      apiPort: document.getElementById('apiPort').value,
      autoSync: document.getElementById('autoSync').checked,
      syncInterval: parseInt(document.getElementById('syncInterval').value) || 30,
      leetcodeUsername: document.getElementById('leetcodeUsername').value.trim(),
      neetcodeUsername: document.getElementById('neetcodeUsername').value.trim(),
      hackerrankUsername: document.getElementById('hackerrankUsername').value.trim(),
      gfgUsername: document.getElementById('gfgUsername').value.trim(),
    };

    chrome.storage.local.set(settings, () => {
      // Update alarm with new interval
      chrome.alarms.create('periodic-sync', { periodInMinutes: settings.syncInterval });

      const statusEl = document.getElementById('saveStatus');
      statusEl.textContent = '✅ Settings saved successfully!';
      setTimeout(() => { statusEl.textContent = ''; }, 3000);
    });
  });
});
