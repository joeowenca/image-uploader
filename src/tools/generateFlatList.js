// Convert the input manifest into a flat array
function generateFlatList(category) {
  const flatList = [];

  // Return blank if category children is undefined
  if (category.children === undefined) {
    return [];
  }

  // Recursively search for images and return a flat list
  function recursiveSearch(category) {
    category.children.map(item => {
      if (item.type === "Image") {
        flatList.push(item);
      } else {
        recursiveSearch(item);
      }
    });
  }

  recursiveSearch(category);

  return flatList;
}

export default generateFlatList;