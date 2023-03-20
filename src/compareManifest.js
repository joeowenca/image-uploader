function compareManifest(previousManifest, currentManifest) {

  // Convert the input manifest into a flat array
  function generateFlatList(manifest) {
    const flatList = [];

    // Recursively search for images and push them to the array
    function recursiveSearch(manifest, flatList) {
      manifest.children.map(item => {
        if (item.type === "File" || item.type === "Image") {
          flatList.push(item.name);
        } else {
          recursiveSearch(item, array);
        }
      });
    }

    recursiveSearch(manifest, flatList);

    return flatList;
  }

  // Flat lists
  const currentImages = generateFlatList(currentManifest);
  const previousImages = generateFlatList(previousManifest);

  // Compare current images to previous images and return what to upload and delete
  return {
    toUpload: currentImages.filter(image => !previousImages.includes(image)),
    toDelete: previousImages.filter(image => !currentImages.includes(image))
  }
}

export default compareManifest;