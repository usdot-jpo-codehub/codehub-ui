export class PickValueConverter {
  toView(array, count) {
    if (!array) { return []; }
    return array.slice(0, count);
  }
}
