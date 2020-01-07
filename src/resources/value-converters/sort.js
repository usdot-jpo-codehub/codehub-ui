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
    let props = config.propertyName.split('.');
    return array
      .slice(0)
      .sort((a, b) => {
        let vA = props.reduce((a, level) => a && a[level], a);
        let vB = props.reduce((b, level) => b && b[level], b);
        if (Array.isArray(vA) && Array.isArray(vB)) {
          return (vA.length - vB.length) * factor;
        }
        return (vA - vB) * factor
      });
  }
}
