import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

// Cloudflare API credentials
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

// Delete image via Cloudflare API
async function cloudflareDelete(imageId) {

  const requestURL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1/${imageId}`;

  const response = await fetch(requestURL, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${API_TOKEN}`
    }
  });
  return await response.json();
}

export default cloudflareDelete;