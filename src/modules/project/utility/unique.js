export class UniqueValueConverter {
  toView(array, config) {
    let propertyArray = [];

    for (let object of array) {
      propertyArray.push(object[config.propertyName]);
    }

    return Array.from(new Set(propertyArray));
  }

}
