const path = require('path');
const electron = require('electron');

const { app, ipcMain } = electron;

const TimerTray = require('./app/timerTray');
const MainWindow = require('./app/mainWindow');

let mainWindow;
let tray;

app.on('ready', () => {
  if( process.platform === 'darwin') {
    app.dock.hide();
  };
  mainWindow = new MainWindow();
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  
  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on("update-timer", (event, timeLeft) => {
  tray.setTitle(timeLeft);
});