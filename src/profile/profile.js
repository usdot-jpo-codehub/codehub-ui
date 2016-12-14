export class Profile {

  constructor(dataContext, router, eventAggregator) {
    this.username = PF_AUTH_GIVENNAME !== '' ? PF_AUTH_GIVENNAME : 'First'; // eslint-disable-line
    this.username = PF_AUTH_SN !== '' ? PF_AUTH_SN : 'Last'; // eslint-disable-line
    this.username = PF_AUTH_SUBJECT !== '' ? PF_AUTH_SUBJECT : 'Email'; // eslint-disable-line
  }

}
