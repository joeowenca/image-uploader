import cloudflareUpload from "./cloudflare/cloudflareUpload.js";
import updateManifest from "./updateManifest.js"

// Organize directories and upload images
async function uploadImages(files, category) {
  await Promise.all(files.children.map(async (file) => {
    if (file.type === "Image") {
        // Upload image
        const data = await cloudflareUpload(file);
        updateManifest(data, category);
    } else if (file.type === "Category") {
      // Create new category based on directory
      const newCategory = { 
        name: file.name, 
        type: "Category",
        children: [] 
      };
      
      category.children.push(newCategory);
      await uploadImages(file, newCategory);
    }
  }));
}

export default uploadImages;