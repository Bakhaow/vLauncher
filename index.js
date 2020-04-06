// IMPORT
const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const ejse = require('ejs-electron');
const discordRPC = require('discord-rpc');
const path = require('path');
const url = require('url');

// WINDOW
let win;
const winWidth = 1080;
const winHeight = 720;

function createWindow () {
  win = new BrowserWindow({
    backgroundColor: '#616161',
    width: winWidth,
    height: winHeight,
    center: true,
    icon: getPlatformIcon('icon'),
    frame: false,
    resizable: false,
    webPreferences: {nodeIntegration: true}
  });

  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'vSite' || frameName === 'vDiscord') {
    event.preventDefault()
    Object.assign(options, {
      modal: true,
      parent: win,
      width: 800,
      height: 600,
      frame: true,
      autoHideMenuBar: true,
      webPreferences: {nodeIntegration: true}
    })
    event.newGuest = new BrowserWindow(options)
  }
})
  win.loadURL(url.format({
      pathname: path.join(__dirname, 'app', 'main.ejs'),
      protocol: 'file:',
      slashes: true
  }));

  win.setMenu(null);

  win.on('restore', (e) => {
      win.setSize(winWidth, winHeight);
  });

  win.on('closed', function () {
    win = null;
  });
  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}
//ICON
function getPlatformIcon(file) {
    const os = process.platform;
    if(os === 'darwin') {
        file = file + '.icns';
    }
    else if(os === 'win32') {
        file = file + '.ico';
    }
    else {
        file = file + '.png';
    }
    return path.join(__dirname, 'app', 'assets', 'images', 'icons', file);
}

app.setName('vLauncher');

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (win === null) {
    createWindow();
  }
});
// AUTOUPDATE
autoUpdater.on('update-available', () => {
  win.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update_downloaded');
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

// RICH PRESENCE DISCORD
const clientId = '696000093454729276';

discordRPC.register(clientId);

const rpc = new discordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc || !win) {
    return;
  }
  rpc.setActivity({
    details: 'sur vLauncher',
    state: 'https://www.google.com',
    startTimestamp,
    largeImageKey: 'background_dl1',
    largeImageText: 'Rejoins nous.',
    smallImageKey: 'background_dl',
    smallImageText: "En Dev",
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity();

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);
