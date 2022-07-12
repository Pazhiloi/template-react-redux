
export function updateImgs(collections, filters) {
  let newImgs = [];
  let a = 0;

  collections.forEach((img, imgKey) => {
    filters.forEach((filter, filterKey) => {
      if (img.tag == filter.name && filter.status == true) {
        newImgs[a] = img;
        a++;
      }
    });
  });
return newImgs
}

export const setAll = (filters) => {
  filters.forEach((filter) => {
    filter.status = false;
  });
  return filters;
};
