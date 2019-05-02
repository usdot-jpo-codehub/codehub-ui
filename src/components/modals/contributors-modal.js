import { inject } from 'aurelia-framework';
import { DialogController, DialogService } from 'aurelia-dialog';
import { LeavingModal } from './leaving-modal';

@inject(DialogController, DialogService)

export class ContributorsModal {
  constructor(controller, dialogService) {
    this.controller = controller;
    controller.settings.centerHorizontalOnly = true;
    controller.settings.lock = false;
    this.dialogService = dialogService;
    this.exitDialogLinkId = null;
    this.visible = true;
  }

  activate(repo) {
    this.repo = repo;
  }

  attached() {
    const element = document.querySelector('#contributors-main');
    if(element) {
      element.focus();
    }
  }

  openLeavingSiteConfirmation(name, url, target) {
    this.visible = false;
    this.exitDialogLinkId = target.getAttribute('id');
    const mdl = { name, url };
    this.dialogService.open({ viewModel: LeavingModal, model: mdl, lock: false }).whenClosed( response => {
      this.visible = true;
      setTimeout(() => {
        const element = document.querySelector('#'+this.exitDialogLinkId);
        if(element) {
          element.focus();
        }
      }, 200);
    });
  }
}
