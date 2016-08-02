export class PickValueConverter {
  toView(array, count) {
    console.log(array);
    return array.slice(0, count);
  }
}
