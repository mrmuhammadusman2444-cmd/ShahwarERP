const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    printPreview: (htmlContent) => ipcRenderer.send('print-preview', htmlContent)
})