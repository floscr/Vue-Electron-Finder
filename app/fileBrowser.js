const electron = require('electron')
const ipcMain = electron.ipcMain
const expandHomeDir = require('expand-home-dir')

const fs = require('fs')
const path = require('path')

module.exports = function () {
  ipcMain.on('signal', (event, dir) => {
    const srcpath = expandHomeDir(dir[0])
    // const walker = walk.walk(expandHomeDir(dir[0]))
    const files = fs.readdirSync(srcpath).filter(file => {
      return fs.statSync(path.join(srcpath, file))
    })

    console.log(files)

    event.sender.send('signal-answer', files)
  })
}
