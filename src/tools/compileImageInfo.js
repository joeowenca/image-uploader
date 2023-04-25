import path from "path";

// Take the image data and organize it into a friendly object
function compileImageInfo(data, image) {
  let publicVariant, thumbnailVariant;

  // Organize public and Thumbnail variants
  data.result.variants.map(variant => {
    if (path.basename(variant) === "public") {
      publicVariant = variant;
    } else if (path.basename(variant) === "Thumbnail") {
      thumbnailVariant = variant;
    }
  })

  // Return image info object
  return {
    name: data.result.filename,
    type: "Image",
    id: image.id,
    cloudflareId : data.result.id,
    categoryName: image.categoryName,
    variants: {
      public: publicVariant,
      thumbnail: thumbnailVariant
    }
  };
}

export default compileImageInfo;