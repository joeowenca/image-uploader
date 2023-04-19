import path from "path";

// data: Image data
function compileImageInfo(data) {
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
    id : data.result.id,
    name: data.result.filename,
    type: "Image",
    variants: {
      public: publicVariant,
      thumbnail: thumbnailVariant
    }
  };
}

export default compileImageInfo;