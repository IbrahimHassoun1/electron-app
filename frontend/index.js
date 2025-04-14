import {app,BrowserWindow,screen} from "electron"
import path from "path"
import { fileURLToPath } from "url"
// import registerIpcHandlers from "./src/main/ipcHandlers.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const loadWindow = () =>{
    const {width,height} = screen.getPrimaryDisplay().bounds
    const window = new BrowserWindow({
        width,
        height,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
        },
        contextIsolation: true, 
        nodeIntegration: false,
    })
    window.webContents.openDevTools();
    // window.loadFile('./react/dist/index.html');
    window.loadURL('http://localhost:5173/')
}

app.whenReady().then(() => {
    loadWindow();
    registerIpcHandlers();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) loadWindow();
    });
  });
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });