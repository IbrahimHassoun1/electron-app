import fs from "fs";
import path from "path";

function saveImageToDisk(buffer, filename) {
  const savePath = path.join(__dirname, "../../public", filename);
  fs.writeFileSync(savePath, Buffer.from(buffer));
  return savePath;
}

export default saveImageToDisk