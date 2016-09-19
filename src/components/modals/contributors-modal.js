import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)

export class ContributorsModal {
  constructor(controller) {
    this.controller = controller;
    controller.settings.centerHorizontalOnly = true;
    controller.settings.lock = false;
  }

  activate(contribs) {
    this.contribs = contribs;
  }
}
