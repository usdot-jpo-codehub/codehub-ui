export class SliceValueConverter {
  toView(array, count) {
    return array.slice(count, array.length);
  }
}
