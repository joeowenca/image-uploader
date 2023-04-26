import cloudflareDelete from "./cloudflareAPI/cloudflareDelete.js";

// Organize categories and upload images
async function deleteImages(images) {

  return images.map(async (image) => {
    if (image.type === "Image") {
      // Upload image
      const data = await cloudflareDelete(image);

      console.log("Deleted image: " + data.result.filename);

      return data;
    }
  });
}

export default deleteImages;