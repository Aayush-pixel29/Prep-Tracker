const { Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let tray;

function setupTray(mainWindow) {
  const iconPath = path.join(__dirname, '..', 'assets', 'icon.png');
  
  // Create a default icon if the file doesn't exist
  let trayIcon;
  try {
    trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  } catch {
    trayIcon = nativeImage.createEmpty();
  }

  tray = new Tray(trayIcon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open PrepTracker',
      click: () => {
        mainWindow.show();
        mainWindow.focus();
      },
    },
    {
      label: 'Quick Stats',
      enabled: false,
    },
    { type: 'separator' },
    {
      label: 'Start Pomodoro (25 min)',
      click: () => {
        mainWindow.show();
        mainWindow.webContents.send('start-pomodoro', 25);
      },
    },
    { type: 'separator' },
    {
      label: 'Quit PrepTracker',
      click: () => {
        const { app } = require('electron');
        app.isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip('PrepTracker — AI/ML Prep Tracker');
  tray.setContextMenu(contextMenu);

  tray.on('double-click', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  return tray;
}

module.exports = { setupTray };
