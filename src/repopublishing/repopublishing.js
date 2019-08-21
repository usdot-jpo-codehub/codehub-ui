import { inject } from './aurelia-framework';
import { Router } from './aurelia-router';
import { DialogService } from './aurelia-dialog';
import { LeavingModal } from '../../components/modals/leaving-modal';


@inject(Router, DialogService)
export class Operations {
  constructor(router, dialogService) {
    this.router = router;
    this.dialogService = dialogService;
    this.message = 'this is the Operations Page';
  }
  openLeavingSiteConfirmation(name, url, target) {
    this.exitDialogLinkId = target.getAttribute('id');
    const mdl = { name, url };
    this.dialogService.open({ viewModel: LeavingModal, model: mdl, lock: false }).whenClosed( response => {
      const element = document.querySelector('#'+this.exitDialogLinkId);
      if(element) {
        element.focus();
      }
    });
  }
}
// profile/account/account.js
// export class Account {
//     configureRouter(config, router) {
//       config.map([
//         { route: '', name: 'account', viewPorts: { mainContent: { moduleId: 'settings/account/account' }}, nav: true, title: 'Account' },
//         //{ route: '', redirect: 'username' },
//         { route: 'username', name: 'username', moduleId: 'settings/account/username/username', nav: true, title: 'Username' },
//         { route: 'password', name: 'password', moduleId: 'settings/account/password/password', nav: true, title: 'Password' }
//       ]);
//       this.router = router;
//     }
//   }