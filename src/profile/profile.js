export class Profile {

  constructor() {
    this.PF_AUTH_GIVENNAME = PF_AUTH_GIVENNAME !== '' ? PF_AUTH_GIVENNAME : 'First'; // eslint-disable-line
    this.PF_AUTH_SN = PF_AUTH_SN !== '' ? PF_AUTH_SN : 'Last'; // eslint-disable-line
    this.PF_AUTH_SUBJECT = PF_AUTH_SUBJECT !== '' ? PF_AUTH_SUBJECT : 'Email'; // eslint-disable-line
  }

}
