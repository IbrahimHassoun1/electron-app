import {app,BrowserWindow,screen} from "electron"

const loadWindow = () =>{
    const {width,height} = screen.getPrimaryDisplay().bounds
    const window = new BrowserWindow({
        width,
        height,
        
    })
    window.webContents.openDevTools();
    // window.loadFile('./react/dist/index.html');
    window.loadURL('http://localhost:5173/')
}

app.whenReady().then(() => {
    loadWindow();
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) loadWindow();
    });
  });
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });