import cloudflareUpload from "./cloudflare/cloudflareUpload.js";
import compileImageInfo from "./compileImageInfo.js"

// Organize categories and upload images
async function uploadImages(files) {

  const uploadedImages = { 
    name: "Images",
    type: "Category",
    children: [] 
  };

  // Recursively search the category and upload found images
  async function recursiveSearch(files, category) {
    await Promise.all(files.children.map(async (file) => {
      if (file.type === "Image") {
          // Upload image
          const data = await cloudflareUpload(file);
          // Once uploaded, push image info to the current category
          category.children.push(compileImageInfo(data));
          console.log("Pushed to public manifest: " + data.result.filename);
      } else if (file.type === "Category") {
        // Create new category based on directory
        const newCategory = { 
          name: file.name, 
          type: "Category",
          children: [] 
        };
        
        category.children.push(newCategory);
        await recursiveSearch(file, newCategory);
      }
    }));
  }

  await recursiveSearch(files, uploadedImages);

  return uploadedImages;
}

export default uploadImages;