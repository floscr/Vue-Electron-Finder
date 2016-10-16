const electron = require('electron')
const ipcMain = electron.ipcMain
const expandHomeDir = require('expand-home-dir')

const fs = require('fs')
const path = require('path')

module.exports = function () {
  ipcMain.on('READ_DIR', (event, dir) => {
    const srcpath = expandHomeDir(dir)

    const src = fs.readdirSync(srcpath)

    const dirs = src.filter(file => {
      return fs.statSync(path.join(srcpath, file)).isDirectory()
    })

    const files = src.filter(file => {
      if (file === '.DS_STORE') return
      return fs.statSync(path.join(srcpath, file)).isFile()
    })

    event.sender.send('DIR_STAT', {
      src: srcpath,
      dirs: dirs,
      files: files
    })
  })
}
