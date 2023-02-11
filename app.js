const { app, BrowserWindow } = require('electron');
require('dotenv').config();
// electron app settings
function createWindow() {
  const win = new BrowserWindow({
    width: 1500,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  win.setMenu(null);
  win.loadURL('http://localhost:' + process.env.SERVER_PORT + '/login.html');
}
// when app is ready
app.whenReady().then(createWindow);
// starting server
require('./server');
// on app close exit command
app.on('window-all-closed', () => { process.exit(0); });