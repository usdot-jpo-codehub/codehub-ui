import moment from 'moment';

export class AgoValueConverter {
  toView(value) {
    return moment(value).fromNow();
  }
}
