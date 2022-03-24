const { app, BrowserWindow, protocol, ipcMain } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

require('@electron/remote/main').initialize()

try {
  require('electron-reloader')(module);
} catch {}

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    // width: 185,
    width: 400,
    height: 100,
    transparent: true,
    frame: false,
    resizable: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    icon: __dirname + '/icon.png',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })  

  win.setAlwaysOnTop(true, 'pop-up-menu')

  ipcMain.handle('quit-app', () => {
    app.quit();
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )  
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})