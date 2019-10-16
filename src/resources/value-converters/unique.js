export class UniqueValueConverter {
  toView(array, config) {
    const propertyArray = [];

    if (!array || !config) {
      return propertyArray;
    }

    for (const object of array) {
      if (object[config.propertyName]) {
        propertyArray.push(object[config.propertyName]);
      } else {
        propertyArray.push('None');
      }
    }
    return Array.from(new Set(propertyArray));
  }

}
