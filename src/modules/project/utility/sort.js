export class SortValueConverter {
  toView(array, config) {
    if (config.propertyName == 'default') {
      if(config.direction === 'ascending'){
        return array
          .slice(0)
          .reverse();
      }
      return array;
    } else {
      var factor = config.direction === 'ascending' ? 1 : -1;
      return array
        .slice(0)
        .sort((a, b) => {
          return (a[config.propertyName] - b[config.propertyName]) * factor
        });
    }
  }
}
