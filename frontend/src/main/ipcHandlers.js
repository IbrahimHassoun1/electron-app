import { ipcMain } from "electron";
import fs from "fs";
import path from "path";

function registerIpcHandlers() {
  ipcMain.on('save-image', (event, bufferJson, filename) => {
    try {
      console.log('inside save-image');
      
      // Reconstruct the Buffer from the incoming JSON object
      const buffer = Buffer.from(bufferJson.data);
      console.log('Filename:', filename);
      console.log('Buffer:', buffer);

      // Choose a path to save the file (ensure it's valid)
      const saveDir = path.join(__dirname, 'public'+filename);
      if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir);
      }

      const fullPath = path.join(saveDir, filename);

      // Write the file to disk
      fs.writeFile(fullPath, buffer, (err) => {
        if (err) {
          console.error('Failed to save image:', err);
          event.sender.send('save-image-failure', err.message);
        } else {
          console.log('Image saved to:', fullPath);
          event.sender.send('save-image-success', fullPath);
        }
      });
    } catch (error) {
      console.error('Unexpected error saving image:', error);
      event.sender.send('save-image-failure', error.message);
    }
  });
}

export default registerIpcHandlers;
