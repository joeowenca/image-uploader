async function compareManifest(localManifest, currentManifest) {
  const localImages = [];
  const currentImages = [];
  
  async function generateFlatList(json, array) {
    await json.children.map(item => {
      if(item.type === "File" || item.type === "Image") {
        array.push(item.name);
      } else if(item.type === "Directory" || item.type === "Category") {
        generateFlatList(item, array);
      }
    });
  }

  generateFlatList(localManifest, localImages);
  generateFlatList(currentManifest, currentImages);

  const imagesToUpload = localImages.concat(currentImages).filter(image => !currentImages.includes(image));
  const imagesToDelete = currentImages.concat(localImages).filter(image => !localImages.includes(image));
}

export default compareManifest;