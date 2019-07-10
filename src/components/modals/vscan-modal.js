import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
export class VScanModal {
  constructor(controller) {
    this.controller = controller;
    this.controller.settings.lock = false;
    this.isFocus = true;
  }

  activate(model) {
    this.repo = model;
  }

  attached() {
    const title = document.querySelector('#vscandialog-title');
    title.focus();
  }

  navigateAndClose() {
    this.controller.cancel();
  }

}
