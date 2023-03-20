import fs from "fs";
import path from "path";

// requestPath: The starting file path to scan
// fileTree: The file tree in JSON
function readDirectory(requestPath, fileTree) {
  // currentPath: The path being scanned (eg. "C:\Users\Joe\Downloads")
  // currentDirectory: The JSON object that found files are pushed to
  function createFileTree(currentPath, currentDirectory) {
    // Get files in current path
    const files = fs.readdirSync(currentPath);

    files.map(file => {
      // Get file data
      const filePath = path.join(currentPath, file);
      const fileType = fs.statSync(filePath);

      if(fileType.isFile()) {
        // Only push JPEGs
        if(path.extname(file) === ".jpg" || path.extname(file) === ".jpeg") {
          // Push found files to current directory
          currentDirectory.children.push({ 
            name: file, 
            type: "File", 
            path: path.join(currentPath, file),
          })
          console.log("Pushed to local manifest: " + file);
        } else {
          console.log("Skipped as file is not a JPEG");
        }
      } else if(fileType.isDirectory()) {
        // Create new subDirectory object to push to the current directory
        const subDirectory = { 
          name: file, 
          type: "Directory", 
          path: path.join(currentPath, file), 
          children: [] 
        };
        currentDirectory.children.push(subDirectory);

        // Run recursively for each sub directory
        createFileTree(path.join(currentPath, file), subDirectory);
      }
    })
  }

  createFileTree(requestPath, fileTree);
}

export default readDirectory;