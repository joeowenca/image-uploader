import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

// Cloudflare API credentials
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

// Delete image via Cloudflare API
async function cloudflareDelete(imageId) {
  try {

    const requestURL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1/${imageId}`;

    const response = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete image: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting image: ${error}`);
    throw error;
  }
}

export default cloudflareDelete;