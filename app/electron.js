'use strict'

const electron = require('electron')
const path = require('path')

const walk = require('walk')
const ipcMain = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow
let config = {}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(config.url)

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then((name) => mainWindow.webContents.openDevTools())
      .catch((err) => console.log('An error occurred: ', err))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  handleSubmissions()

  console.log('mainWindow opened')
}

function handleSubmissions () {
  ipcMain.on('signal', (event, dir) => {
    const walker = walk.walk(dir[0])
    const files = []

    walker.on('file', (root, stat, next) => {
      files.push(`${root}/${stat.name}`)
      next()
    })

    walker.on('end', _ => {
      console.log(files)
      event.sender.send('signal-answer', files)
    })
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
