// starting server and getting env variables
require('./server');
require('dotenv').config();
// electron app settings
const { app, BrowserWindow } = require('electron');
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
// when app is ready create the window
app.whenReady().then(createWindow);
// on app close exit command
app.on('window-all-closed', () => { process.exit(0); });