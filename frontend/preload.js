const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  selectImage: () => ipcRenderer.invoke('dialog:selectImage'),
  saveImage: (fileName, buffer) => ipcRenderer.invoke('fs:saveImage', fileName, buffer),
  
  // For debugging
  ping: () => ipcRenderer.invoke('ping')
});

// Add this for error handling
process.once('loaded', () => {
  console.log('Preload script loaded successfully');
});