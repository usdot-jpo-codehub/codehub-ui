import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DialogFunctions } from '../resources/shared/dialog-functions';

@inject(Router, DialogFunctions)
export class AdditionalInformation {
  constructor(router, dialogFunctions) {
    this.router = router;
    this.dialogFunctions = dialogFunctions;
    this.message = 'this is the Additional Information Page';
  }

}