import generateFlatList from './tools/generateFlatList.js';

async function compareImages(previousImages, currentImages) {
  const currentImagesList = generateFlatList(currentImages);

  // TODO: Change condition to support previous images object
  // Create flat lists
  if (previousImages.type === "Category") {
    const previousImagesList = generateFlatList(previousImages);

    // Return the filtered lists upon comparison
    return {
      toUpload: currentImagesList.filter(image => {
        return !previousImagesList.some(prevImage => prevImage.id === image.id);
      }),
      toDelete: previousImagesList.filter(prevImage => {
        return !currentImagesList.some(image => image.id === prevImage.id);
      }),
    }
  }

  // If no previous images, just return the currentImagesList to upload
  return {
    toUpload: currentImagesList
  }
}

export default compareImages;