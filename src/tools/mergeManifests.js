async function mergeManifests(manifest1, manifest2) {
  const mergedManifest = {
    ...manifest1,
    ...manifest2
  }

  return mergedManifest;
}

export default mergeManifests;