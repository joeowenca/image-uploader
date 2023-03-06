import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const requestURL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`;

function uploadImages(files, category) {
  files.children.map(file => {
    if (file.type === "File") {
      category.children.push(uploadImage(file));
    } else if (file.type === "Directory") {
      const newCategory = { category: file.name, children: [] };
      category.children.push(newCategory);
      uploadImages(file, newCategory);
    }
  });
}

function uploadImage(file) {
  const fileData = fs.readFileSync(file.path);
  const image = new Blob([fileData], { type: 'image/jpeg' });

  const formData = new FormData();
  formData.append('file', image);

  fetch(requestURL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_TOKEN}`
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      console.log(response.json());
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    const link = path.basename(data.result.variants[0]);
    if (link === "public") {
      console.log("Public link: " + data.result.variants[0]);
      return data.result.variants[0];
    } else if (link === "Thumbnail") {
      console.log("Public link: " + data.result.variants[1]);
      return data.result.variants[1];
    }
  })
  .catch(error => {
    console.log(error);
  });
}

export default uploadImages;