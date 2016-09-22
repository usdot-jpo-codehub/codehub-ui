export class SkipValueConverter {
  toView(array, count) {
    if (!array) { return []; }
    return array.slice(count, array.length);
  }
}
