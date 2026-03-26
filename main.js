const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const express = require('express');

let mainWindow;
const PORT = 3000;

// Start Express server to serve files on port 3000
const expressApp = express();
expressApp.use(express.static(path.join(__dirname)));

expressApp.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    fullscreen: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.setMenu(null);
  
  // Optional: start maximized for full desktop feel
  mainWindow.maximize();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('run-exe', async (event, command) => {
  try {
    // Clean command and run via start (handles paths with spaces, built-ins like notepad/calc/cmd/explorer)
    const proc = spawn('cmd.exe', ['/c', `start "" ${command}`], {
      detached: true,
      stdio: 'ignore',
      shell: true
    });
    proc.unref();
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});