import generateFlatList from './tools/generateFlatList.js';

function combineAllImages(uploadedImages, previousManifest) {
  const flatPreviousManifest = generateFlatList(previousManifest);

  return [
    ...flatPreviousManifest,
    ...uploadedImages
  ]
}

export default combineAllImages;