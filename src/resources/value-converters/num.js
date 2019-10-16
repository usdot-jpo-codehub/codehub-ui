export class NumValueConverter {
  toView(num, digits) {
    if (!num) { return 0; }
    const si = [
      { value: 1E18, symbol: 'E' },
      { value: 1E15, symbol: 'P' },
      { value: 1E12, symbol: 'T' },
      { value: 1E9, symbol: 'G' },
      { value: 1E6, symbol: 'M' },
      { value: 1E3, symbol: 'K' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    for (let i = 0; i < si.length; i++) {
      if (num >= si[i].value) {
        let n = (num / si[i].value);
        let f = n.toFixed(digits);
        let r = f.replace(rx, '$1');

        return r + si[i].symbol;
      }
    }
    return num.toFixed(digits).replace(rx, '$1');
  }
}
