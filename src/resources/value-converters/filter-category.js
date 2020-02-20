export class FilterCategoryValueConverter {
  toView(array, config) {
    if (!array) {
      return null;
    }
    if (!config || !config.filterArray || config.filterArray.length === 0) {
      return array;
    }

    let result = array.slice(0).filter((project) => {
      for(const category of config.filterArray) {
        const categoryId = category.split('|')[0];
        if (project.codehubData.categories && project.codehubData.categories.length > 0 && project.codehubData.categories.includes(categoryId)) {
          return true;
        }
      }
      return false;
    });
    return result;
  }
}
