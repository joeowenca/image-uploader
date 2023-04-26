import fs from "fs";
import getCurrentImages from "./src/getCurrentImages.js";
import compareImages from "./src/compareImages.js";
import uploadImages from "./src/uploadImages.js";
// import deleteImages from "./src/deleteImages.js";
import createUploadedManifest from "./src/createUploadedManifest.js";
import mergeManifests from "./src/tools/mergeManifests.js";

async function createBlankManifestFile() {
  await fs.promises.writeFile('manifest.json', JSON.stringify({}));
}

async function importManifestFile(filePath) {
  const manifest = await import(filePath, { assert: { type: "json" } });
  return manifest.default;
}

async function uploadFilteredImages(imagesToUpload) {
  const uploadedImagePromises = await uploadImages(imagesToUpload);
  return Promise.all(uploadedImagePromises);
}

async function writeManifestToFile(currentManifest) {
  fs.writeFileSync('manifest.json', JSON.stringify(currentManifest, null, 2));
  console.log("Images manifest updated.");
}

async function runImagePipeline() {
  try {
    // Create a blank manifest file if it doesn't exist
    if (!fs.existsSync('manifest.json')) {
      await createBlankManifestFile();
    }

    // Import previous images
    const previousManifest = await importManifestFile("./manifest.json");

    // Get current images
    const currentManifest = await getCurrentImages(process.argv[2]);

    // Compare images
    const filteredImages = await compareImages(previousManifest, currentManifest);

    // Upload images
    const uploadedImages = await uploadFilteredImages(filteredImages.toUpload);

    // Delete images
    // const deletedImages = await deleteImages(filteredImages.toDelete);

    // Create manifest of images just uploaded
    const uploadedManifest = await createUploadedManifest(uploadedImages, currentManifest);

    // Merge uploadedManifest with currentManifest
    const newCurrentManifest = await mergeManifests(uploadedManifest, currentManifest);

    // Write manifest to file if it has changed
    if (JSON.stringify(newCurrentManifest) !== JSON.stringify(previousManifest)) {
      await writeManifestToFile(newCurrentManifest, previousManifest);
    }

    console.log("Image pipeline completed successfully.");

  } catch (error) {
    console.error("Error in image pipeline: ", error);
  }
}

runImagePipeline();
