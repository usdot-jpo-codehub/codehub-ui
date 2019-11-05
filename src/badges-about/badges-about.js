import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { LeavingModal } from '../components/modals/leaving-modal';


@inject(Router, DialogService)
export class Repopublishing {
  constructor(router, dialogService) {
    this.router = router;
    this.dialogService = dialogService;
    this.message = 'this is the About Badges Page';
  }
  activate(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  openLeavingSiteConfirmation(name, url, target, bypass) {
    this.exitDialogLinkId = target.getAttribute('id');
    let byp = bypass === undefined ? false : bypass;
    if(byp) {
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
