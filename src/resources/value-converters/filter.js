export class FilterValueConverter {
  toView(array, config) {
    if (!array) {
      return null;
    }
    if (!config || !config.filterArray || config.filterArray.length === 0) {
      return array;
    }

    let result = array
    .slice(0)
    .filter((object) => {
      for (const value of config.filterArray) {
        let props = config.propertyName.split('.');
        let v = props.reduce((obj, level) => obj && obj[level], object);
        if (v) {
          if (v === value) {
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
