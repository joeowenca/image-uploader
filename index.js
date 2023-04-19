import fs from "fs";
import createUploadManifest from "./src/createUploadManifest.js";
import uploadImages from "./src/uploadImages.js";

// Get images to upload
const imagesToUpload = await createUploadManifest(process.argv[2]);

// Upload images
const uploadedImages = await uploadImages(imagesToUpload);

// Write images to file
fs.writeFileSync('manifest.json', JSON.stringify(uploadedImages, null, 2));