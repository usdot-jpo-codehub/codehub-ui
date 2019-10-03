import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { LeavingModal } from '../components/modals/leaving-modal';


@inject(Router, DialogService)
export class AdditionalInformation {
  constructor(router, dialogService) {
    this.router = router;
    this.dialogService = dialogService;
    this.message = 'this is the Additional Information Page';
  }
  openLeavingSiteConfirmation(name, url, target, bypass) {
    this.exitDialogLinkId = target.getAttribute('id');
    bypass = bypass === undefined ? false : bypass;
    if(bypass) {
      const win = window.open(url, '_blank');
      win.focus();
    } else {
      const mdl = { name, url };
      this.dialogService.open({ viewModel: LeavingModal, model: mdl, lock: false }).whenClosed( response => {
        const element = document.querySelector('#'+this.exitDialogLinkId);
        if(element) {
          element.focus();
        }
      });
    }
  }
}