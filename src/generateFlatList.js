// Convert the input manifest into a flat array
function generateFlatList(manifest) {
  const flatList = [];

  // Recursively search for images and push them to the array
  function recursiveSearch(manifest, flatList) {
    manifest.children.map(item => {
      if (item.type === "Image") {
        flatList.push(item.name);
      } else {
        recursiveSearch(item, flatList);
      }
    });
  }

  recursiveSearch(manifest, flatList);

  return flatList;
}

export default generateFlatList;