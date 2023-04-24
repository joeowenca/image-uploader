import cloudflareUpload from "./cloudflareAPI/cloudflareUpload.js";
import compileImageInfo from "./tools/compileImageInfo.js"

// Organize categories and upload images
async function uploadImages(images) {

  return images.map(async (image) => {
    if (image.type === "Image") {
      // Upload image
      const data = await cloudflareUpload(image);
      console.log("Uploaded image: " + data.result.filename);

      // Once uploaded, push image info to the current category
      return compileImageInfo(data, image);
    }
  });
}

export default uploadImages;