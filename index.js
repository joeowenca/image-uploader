import fs from "fs";
import createUploadManifest from "./src/createUploadManifest.js";
import uploadImages from "./src/uploadImages.js";
/* 
// Local images to be uploaded
const localManifest = { 
  name: path.basename(requestPath), 
  type: "Directory", 
  children: [] 
}; */

// Public images for production use
const publicManifest = { 
  name: "Images",
  type: "Category",
  children: [] 
};

const uploadManifest = await createUploadManifest(process.argv[2]);

await uploadImages(uploadManifest, publicManifest);

fs.writeFileSync('manifest.json', JSON.stringify(publicManifest, null, 2));