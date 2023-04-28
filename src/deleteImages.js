import cloudflareDelete from "./cloudflareAPI/cloudflareDelete.js";

// Organize categories and upload images
async function deleteImages(images) {

  if (!images) {
    return;
  }

  return images.map(async (image) => {
    if (image.type === "Image") {
      // Upload image
      await cloudflareDelete(image.cloudflareId);
      console.log("Deleted image: " + image.name);
    }
  });
}

export default deleteImages;