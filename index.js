import fs from "fs";
import dotenv from "dotenv";
import admin from 'firebase-admin';
import getLocalImages from "./src/getLocalImages.js";
import compareImages from "./src/compareImages.js";
import uploadImages from "./src/uploadImages.js";
import deleteImages from "./src/deleteImages.js";
import combineAllImages from "./src/combineAllImages.js";
import createUploadedManifest from "./src/createUploadedManifest.js";

// Initialize dotenv
dotenv.config();

async function createBlankManifestFile() {
  await fs.promises.writeFile('manifest.json', JSON.stringify({}));
}

async function importManifestFile(filePath) {
  const manifest = await import(filePath, { with: { type: "json" } });
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

async function uploadToDatabase(manifest) {
  const serviceAccount = (await import("./serviceAccountKey.json", { with: { type: "json" } })).default;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://photography-5abf9-default-rtdb.firebaseio.com"
  });

  const database = admin.database();
  const ref = database.ref('photography');

  // Read manifest file and return JSON data
  const jsonData = JSON.parse(fs.readFileSync(manifest));

  try {
    await ref.set(jsonData);
    console.log('Image data uploaded to database.');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

async function runImagePipeline() {
  try {
    // Create a blank manifest file if it doesn't exist
    if (!fs.existsSync('manifest.json')) {
      await createBlankManifestFile();
    }

    // Import previous images
    const previousManifest = await importManifestFile("./manifest.json");

    // Get local images
    const localManifest = await getLocalImages(process.argv[2]);

    // Compare images and return a flat list of filtered images
    const filteredImages = await compareImages(previousManifest, localManifest);

    // Upload images
    const uploadedImages = await uploadFilteredImages(filteredImages.toUpload);

    // Delete images
    await deleteImages(filteredImages.toDelete);

    // Create list of all images
    const allUploadedImages = combineAllImages(uploadedImages, previousManifest);

    // Create manifest of images just uploaded
    const currentManifest = await createUploadedManifest(allUploadedImages, localManifest);

    // Write manifest to file if it has changed
    if (JSON.stringify(currentManifest) !== JSON.stringify(previousManifest)) {
      await writeManifestToFile(currentManifest);
    }

    // Upload to database
    await uploadToDatabase('manifest.json');
    
    console.log("Complete.");

  } catch (error) {
    console.error("Error in image pipeline: ", error);
  }
}

runImagePipeline();
