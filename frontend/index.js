import { app, BrowserWindow, screen, ipcMain, dialog } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create images directory if it doesn't exist
const createImagesDirectory = () => {
  const imagesDir = path.join(app.getAppPath(), 'react/public');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }
};

// Register all IPC handlers
const registerIpcHandlers = () => {
  // Image selection handler
  ipcMain.handle('dialog:selectImage', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif', 'jpeg', 'webp'] }
      ]
    });
    
    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      const fileName = path.basename(filePath);
      const fileBuffer = fs.readFileSync(filePath);
      return { fileName, buffer: fileBuffer };
    }
    return null;
  });

  // Image saving handler
  ipcMain.handle('fs:saveImage', async (event, fileName, buffer) => {
    const filePath = path.join(app.getAppPath(), 'react/public', fileName);
    fs.writeFileSync(filePath, Buffer.from(buffer));
    return fileName;
  });

  // App path handler
  ipcMain.handle('app:getPath', () => {
    return app.getAppPath();
  });
};

const loadWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().bounds;
  const window = new BrowserWindow({
    width,
    height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    contextIsolation: true,
    nodeIntegration: false,
  });
  window.webContents.openDevTools();
  // window.loadFile('./react/dist/index.html');
  window.loadURL('http://localhost:5173/');
};

app.whenReady().then(() => {
  createImagesDirectory();
  loadWindow();
  registerIpcHandlers();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) loadWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});