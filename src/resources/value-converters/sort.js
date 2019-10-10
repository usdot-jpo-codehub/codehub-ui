export class SortValueConverter {
  toView(array, config) {

    if (!array) {
      return null;
    }
    if (!config) {
      return array;
    }

    if (config.propertyName === 'default') {
      if (config.direction === 'ascending') {
        return array
          .slice(0)
          .reverse();
      }
      return array;
    }
    const factor = config.direction === 'ascending' ? 1 : -1;
    return array
      .slice(0)
      .sort((a, b) => (a[config.propertyName] - b[config.propertyName]) * factor);
  }
}
