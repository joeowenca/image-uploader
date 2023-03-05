import fs from "fs";
import path from "path";

function readDirectory() {
  const arg = process.argv[2];
  const requestPath = arg;
  const fileTree = { name: path.basename(arg), type: "Directory", children: [] };

  // currentPath is the path being scanned (eg. "C:\Users\Joe\Downloads")
  // currentDirectory is the JSON object that found files are pushed to
  function createTree(currentPath, currentDirectory) {
    // Get files in current path
    const files = fs.readdirSync(currentPath);

    files.map(file => {
      const filePath = path.join(currentPath, file);
      const fileType = fs.statSync(filePath);

      if(fileType.isFile()) {
        // Push found files to current directory
        currentDirectory.children.push({ 
          name: file, 
          type: "File", 
          path: path.join(currentPath, file),
        })
      } else if(fileType.isDirectory()) {
        // Create new subDirectory object to push to the current directory
        const subDirectory = { 
          name: file, 
          type: "Directory", 
          path: path.join(currentPath, file), 
          children: [] 
        };
        currentDirectory.children.push(subDirectory);
        createTree(path.join(currentPath, file), subDirectory);
      }
    })
  }

  createTree(requestPath, fileTree);
}

export default readDirectory;