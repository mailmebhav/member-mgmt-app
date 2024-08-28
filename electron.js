const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const kill = require('tree-kill'); // Import tree-kill


let mainWindow;
let nextServer = null; // Initialize server as null to avoid reference errors

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Start the Next.js app (production build)
  nextServer = exec('npm run start', { cwd: __dirname });

  nextServer.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  nextServer.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  // Load the Next.js app into the Electron window
  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Gracefully stop the Next.js server when quitting the Electron app
app.on('before-quit', () => {
  if (nextServer && nextServer.pid) {
    console.log(`Killing Next.js server with PID: ${nextServer.pid}`);
    try {
      kill(nextServer.pid, 'SIGTERM', (err) => {
        if (err) {
          console.error('Failed to terminate Next.js server:', err);
        } else {
          console.log('Next.js server process terminated');
        }
      });
      // Add a fallback to kill the process if it doesn't respond to SIGTERM
      execSync(`kill -9 ${nextServer.pid}`);
    } catch (error) {
      console.error('Error while trying to kill Next.js server:', error);
    }
  }
});
