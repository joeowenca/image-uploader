const obj1 = {
  name: "Uploaded images",
  type: "Category",
  children: [
    {
      name: "Another folder",
      type: "Category",
      children: [
        {
          name: "image 3",
          type: "image",
          id: "image 3-another folder"
        }
      ]
    },
    {
      name: "image 1",
      type: "image",
      id: "image 1-Uploaded images"
    },
    {
      name: "image 2",
      type: "image",
      id: "image 2-Uploaded images"
    },
  ]
}

const obj2  = {
  name: "Uploaded images",
  type: "Category",
  children: [
    {
      name: "image 4",
      type: "image",
      id: "image 4-Uploaded images"
    }
  ]
}

const mergedObj = {
  ...obj2,
  ...obj1
}

console.log(mergedObj);