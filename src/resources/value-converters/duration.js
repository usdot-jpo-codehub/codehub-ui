import humanizeDuration from 'humanize-duration';

export class DurationValueConverter {
  toView(value) {
    // value is in minutes
    if (!value) {
      return '0';
    }
    let val = (value/60/8); //days of 8 hours
    val = val * 24 * 60 * 60 * 100; //milliseconds
    let result = humanizeDuration(val, { units: ['d'], round: true });
    return result;
  }
}
