const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runExe: (command) => ipcRenderer.invoke('run-exe', command)
});