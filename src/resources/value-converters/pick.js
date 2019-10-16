export class PickValueConverter {
  toView(array, count) {
    if (!array || !count || (count<=0) ) { return []; }
    return array.slice(0, count);
  }
}
