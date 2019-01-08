import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
export class LeavingModal {
  constructor(controller) {
    this.controller = controller;
    // this.controller.settings.centerHorizontalOnly = true;
    this.controller.settings.lock = false;
    this.isFocus = true;
  }

  activate(model, navigationInstruction) {
    this.model = model;
  }

  navigateAndClose() {
    window.location.assign(this.model.url);
    // const win = window.open(this.model.url, '_blank');
    // win.focus();

    this.controller.cancel();
  }

}
