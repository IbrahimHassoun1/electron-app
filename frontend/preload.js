const { contextBridge, ipcRenderer } = require('electron');
const {fs} = require('fs');
contextBridge.exposeInMainWorld('api', {
  saveImage: (arrayBuffer, filename) => {
    const buffer = Buffer.from(arrayBuffer);
    const dir = path.join(os.homedir(), 'Pictures', 'MyAppImages');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, buffer);
    return filePath;
  },
  onSaveSuccess: (cb) => ipcRenderer.once('save-image-success', (e, path) => cb(path)),
  onSaveError: (cb) => ipcRenderer.once('save-image-failure', (e, err) => cb(err)),
  log: (message) => console.log(message),
});


