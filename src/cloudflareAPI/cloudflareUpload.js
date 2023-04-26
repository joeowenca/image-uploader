import dotenv from "dotenv";
import fs from "fs";

// Initialize dotenv
dotenv.config();

// Cloudflare API credentials
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const requestURL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`;

// Upload image via Cloudflare API
async function cloudflareUpload(file) {
  try {
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

    // Throw error if status code is not within the 200 range
    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error uploading file ${error}`);
    throw error;
  }
}

export default cloudflareUpload;