import path from "path";

// data: Image data
// category: Category to add image data to
function updateManifest(data, category) {
  let publicVariant, thumbnailVariant;

  // Organize public and Thumbnail variants
  data.result.variants.map(variant => {
    if (path.basename(variant) === "public") {
      publicVariant = variant;
    } else if (path.basename(variant) === "Thumbnail") {
      thumbnailVariant = variant;
    }
  })

  // Organized imageData object to push to manifest
  const imageData = {
    id : data.result.id,
    name: data.result.filename,
    type: "Image",
    variants: {
      public: publicVariant,
      thumbnail: thumbnailVariant
    }
  };

  // Push to manifest
  category.children.push(imageData);
  console.log("Pushed to public manifest: " + imageData.name);
}

export default updateManifest;