import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import readDirectory from './readDirectory.js'

dotenv.config();

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const requestURL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`;

const images = { name: "Images", children: [] };

// TODO: When uploading images, look at tree, but trim it down just to what needs to send to Cloudflare as a flat hierchy

async function uploadImages(files, category) {
  await Promise.all(files.children.map(async (file) => {
    if (file.type === "File") {
      const data = await uploadImage(file);
      pushToManifest(data, category);
    } else if (file.type === "Directory") {
      const newCategory = { category: file.name, children: [] };
      category.children.push(newCategory);
      await uploadImages(file, newCategory);
    }
  }));
}

function pushToManifest(data, category) {
  let publicVariant;
  let thumbnailVariant;

  data.result.variants.map(variant => {
    if (path.basename(variant) === "public") {
      publicVariant = variant;
    } else if (path.basename(variant) === "Thumbnail") {
      thumbnailVariant = variant;
    }
  })

  const imageData = {
    id : data.result.id,
    name: data.result.filename,
    variants: {
      public: publicVariant,
      thumbnail: thumbnailVariant
    }
  };

  category.children.push(imageData);
  console.log("Pushed to manifest: " + imageData.name);
}

async function uploadImage(file) {
  // Read file from path
  const fileData = fs.readFileSync(file.path);
  const image = new Blob([fileData], { type: 'image/jpeg' });

  // Add file to FormData
  const formData = new FormData();
  formData.append('file', image, file.name);

  // Upload FormData to Cloudflare API
  const response = await fetch(requestURL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_TOKEN}`
    },
    body: formData
  });
  return await response.json();
}

await uploadImages(readDirectory(path.normalize(process.argv[2])), images);
fs.writeFileSync('manifest.json', JSON.stringify(images, null, 2));