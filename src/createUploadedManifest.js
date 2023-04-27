async function createUploadedManifest(uploadedImages, currentImages) {

  const uploadedManifest = {
    name: currentImages.name,
    type: "Category",
    children: []
  };

  function recursiveSearch(currentManifest, currentCategory) {
    currentManifest.children.map(item => {
      if (item.type === "Image") {
        uploadedImages.map(uploadedImage => {
          if(item.id === uploadedImage.id) {
            // Push the corresponding image to the new manifest
            currentCategory.children.push(uploadedImage);
          }
        });
      } else {
        const subCategory = {
          name: item.name,
          type: "Category",
          children: []
        };
        currentCategory.children.push(subCategory);
        recursiveSearch(item, subCategory);
      }
    });
  }

  recursiveSearch(currentImages, uploadedManifest);

  return uploadedManifest;
}

export default createUploadedManifest;