'use strict'

const { app, BrowserWindow, globalShortcut,ipcRenderer } = require('electron')
const electron = require('electron');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    fullscreen: false,
    width: 1000
  })

  mainWindow.setMenu(null)
  mainWindow.loadURL(winURL)
  // 注册一个 'CommandOrControl+X' 的全局快捷键
  globalShortcut.register('CommandOrControl+Alt+K', () => {
    mainWindow.webContents.openDevTools()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

electron.ipcMain.on('getPrinterList', (event) => {
  //主线程获取打印机列表
  const list = mainWindow.webContents.getPrinters();

  //通过webContents发送事件到渲染线程，同时将打印机列表也传过去
  mainWindow.webContents.send('getPrinterList', list);
});


/*ipcRenderer.on('webview-print-render', (event, deviceInfo) => {
  // 动态创建一个img标签，然后插入到<body>中。deviceInfo是渲染线程传过来的数据
  let html = '';
  html = `<img src="${deviceInfo.imgSource}"
     width="${deviceInfo.imgWidth}px"
     height="${deviceInfo.imgHeight}px">`;
  document.getElementById('bd').innerHTML = html;

  //当图片插入到页面后，通过ipcRenderer对象的sendToHost方法和渲染线程通讯，告诉渲染线程打印的内容已经准备完毕，请开始打印操作
  ipcRenderer.sendToHost('webview-print-do');
});*/

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
