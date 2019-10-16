export class SkipValueConverter {
  toView(array, count) {
    if (!array || !count || (count < 0) || (count >= array.length)) {
      return [];
    }
    return array.slice(count, array.length);
  }
}
