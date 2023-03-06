import fs from "fs";
import readDirectory from './readDirectory.js'
import uploadImages from './uploadImages.js'

const images = { name: "Images", children: [] };
 
uploadImages(readDirectory(process.argv[2]), images);

fs.writeFileSync('manifest.json', JSON.stringify(images, null, 2));