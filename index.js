import fs from "fs";
import getCurrentImages from "./src/getCurrentImages.js";
import compareImages from "./src/compareImages.js";
import uploadImages from "./src/uploadImages.js";

// If manifest doesn't exist, create a blank one
if (!fs.existsSync('manifest.json')) {
  fs.writeFileSync('manifest.json', JSON.stringify({}));
}

// Import previous images
const previousImages = import("./manifest.json", { assert: { type: "json" } });

// Get current images
const currentImages = await getCurrentImages(process.argv[2]);

// Compare images
const filteredImages = await compareImages(previousImages, currentImages);

// Upload images
uploadImages(filteredImages.toUpload)
.then((images) => {
  return Promise.all(images);
})
.then((results) => {
  // Write images to file
  fs.writeFileSync('manifest.json', JSON.stringify(results, null, 2));
  console.log("Upload complete!");
});

// Delete images
