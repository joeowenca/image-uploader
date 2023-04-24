import generateFlatList from './tools/generateFlatList.js';

async function compareImages(previousImages, currentImages) {

  // Create flat lists
  if (previousImages.children !== undefined) {
    const previousImagesList = generateFlatList(previousImages);
    const currentImagesList = generateFlatList(currentImages);

    // Return the filtered lists upon comparison
    return {
      toUpload: currentImagesList.filter(image => !previousImagesList.includes(image)),
      toDelete: previousImagesList.filter(image => !currentImagesList.includes(image))
    }
  }

  // If no previous images, just return the currentImagesList to upload
  return {
    toUpload: generateFlatList(currentImages)
  }
}

export default compareImages;