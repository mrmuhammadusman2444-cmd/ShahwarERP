const path = require('path')
const fs = require('fs')
const os = require('os')

const { app, BrowserWindow, ipcMain } = require('electron')

const iconPath = path.join(__dirname, 'src/assets/Images/TaskbarIcon.ico')
const preloadPath = path.join(__dirname, 'preload.cjs')

console.log('PRELOAD PATH:', preloadPath)
console.log('PRELOAD EXISTS:', fs.existsSync(preloadPath))

function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: preloadPath
        }
    })

    win.loadURL('http://localhost:5173')
}

ipcMain.on('print-html', (event, html) => {
    let htmlWithButton = html.replace('</body>', `
        <div class="no-print" style="position:fixed;top:12px;right:12px;z-index:9999;">
            <button onclick="window.print()" style="padding:9px 22px;background:#059669;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:bold;font-family:Arial;font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,0.15);">🖨 Print</button>
        </div>
        <style>@media print { .no-print { display: none !important; } }</style>
        </body>
    `)

    let previewWin = new BrowserWindow({
        width: 900,
        height: 800,
        title: 'Print Preview'
    })

    previewWin.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlWithButton))
})


app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})