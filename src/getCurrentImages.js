import fs from "fs";
import path from "path";

// requestPath: The starting file path to scan
async function getCurrentImages(requestPath) {
  const currentImages = {
    name: path.basename(requestPath), 
    type: "Category", 
    children: []
  };

  // currentPath: The path being scanned (eg. "C:\Users\Joe\Downloads")
  // currentCategory: The JSON object that found images are pushed to
  function recursiveSearch(currentPath, currentCategory) {
    // Get files in current path
    const files = fs.readdirSync(currentPath);

    files.map(file => {
      // Get file data
      const filePath = path.join(currentPath, file);
      const fileType = fs.statSync(filePath);

      if(fileType.isFile()) {
        // Only push JPEGs
        if(path.extname(file) === ".jpg" || path.extname(file) === ".jpeg") {
          // Push found images to current category
          currentCategory.children.push({
            name: file, 
            type: "Image", 
            id: `${file}-${currentCategory.name}`,
            path: path.join(currentPath, file),
          })
          console.log("Found file: " + file);
        } else {
          console.log("Skipped as file is not a JPEG");
        }
      } else if(fileType.isDirectory()) {
        // Create new subCategory object to push to the current category
        const subCategory = {
          name: file, 
          type: "Category", 
          path: path.join(currentPath, file), 
          children: [] 
        };
        currentCategory.children.push(subCategory);

        // Run recursively for each sub category
        recursiveSearch(path.join(currentPath, file), subCategory);
      }
    })
  }

  recursiveSearch(requestPath, currentImages);

  return currentImages;
}

export default getCurrentImages;