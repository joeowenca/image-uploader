import fs from "fs";
import getCurrentImages from "./src/getCurrentImages.js";
import compareImages from "./src/compareImages.js";
import uploadImages from "./src/uploadImages.js";
import createImagesManifest from "./src/createImagesManifest.js";

// If manifest doesn't exist, create a blank one
if (!fs.existsSync('manifest.json')) {
  fs.writeFileSync('manifest.json', JSON.stringify({}));
}

// Import previous images
const previousImages = await import("./manifest.json", { assert: { type: "json" } });

// Get current images
const currentImages = await getCurrentImages(process.argv[2]);

// Compare images
const filteredImages = await compareImages(previousImages.default, currentImages);

// Upload images
const uploadedImagePromises = await uploadImages(filteredImages.toUpload);
const uploadedImages = await Promise.all(uploadedImagePromises);

// Delete images

// Create manifest
const imagesManifest = await createImagesManifest(uploadedImages, currentImages);

// TODO: Only write to manifest on change
// Write manifest to file
fs.writeFileSync('manifest.json', JSON.stringify(imagesManifest, null, 2));
console.log("Image sync complete!");