const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const Store = require('./store');

app.setName('Todo Today');

let mainWindow;
let saveTimeout = null;
const store = new Store();

function createWindow() {
  const winState = store.getWindowState();
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenW, height: screenH } = primaryDisplay.workAreaSize;

  const x = validateCoord(winState.x, screenW - 420, screenW);
  const y = validateCoord(winState.y, 60, screenH);
  const w = winState.width && winState.width >= 300 ? winState.width : 380;
  const h = winState.height && winState.height >= 400 ? winState.height : 560;

  mainWindow = new BrowserWindow({
    width:  w,
    height: h,
    x:      x,
    y:      y,
    minWidth: 300,
    minHeight: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: false,
    resizable: true,
    skipTaskbar: false,
    hasShadow: false,
    backgroundColor: '#00000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.on('resize', debouncedSave);
  mainWindow.on('move',   debouncedSave);
  mainWindow.on('close',  () => { flushSave(); saveWindowState(); });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function validateCoord(val, fallback, max) {
  if (val == null) return fallback;
  if (val < -200 || val > max + 200) return fallback;
  return val;
}

function debouncedSave() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveWindowState();
    saveTimeout = null;
  }, 800);
}

function flushSave() {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
    saveTimeout = null;
  }
}

function saveWindowState() {
  if (!mainWindow) return;
  const bounds = mainWindow.getBounds();
  store.saveWindowState({
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height
  });
}

ipcMain.handle('store:getAll', () => {
  return store.getAll();
});

ipcMain.handle('store:saveAll', (_event, data) => {
  store.saveAll(data);
  return true;
});

ipcMain.handle('window:close', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.handle('window:minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.handle('window:toggleOnTop', (_event, flag) => {
  if (mainWindow) {
    mainWindow.setAlwaysOnTop(flag);
    return mainWindow.isAlwaysOnTop();
  }
  return false;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
