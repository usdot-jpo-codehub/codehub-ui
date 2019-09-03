export class FilterValueConverter {
  toView(array, config) {
    if (config.filterArray.length === 0)
      return array;

    let result = array
    .slice(0)
    .filter((object) => {
      for (const value of config.filterArray) {
        if (object[config.propertyName]) {
          if (object[config.propertyName] === value) {
            return true;
          }
        } else if (value === 'None') {
          return true;
        }
      }
      return false;
    });
    return result;
  }
}
