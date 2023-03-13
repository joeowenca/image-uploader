import cloudflareAPI from "./cloudflareAPI.js";
import updateManifest from "./updateManifest.js"

// Organize directories and upload images
async function uploadImages(files, category) {
  await Promise.all(files.children.map(async (file) => {
    if (file.type === "File") {
      // Upload image
      const data = await cloudflareAPI(file);
      updateManifest(data, category);
      
    } else if (file.type === "Directory") {
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