import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { LeavingModal } from 'components/modals/leaving-modal.js';
import { ReadmeModal } from 'components/modals/readme-modal';
import { VScanModal } from 'components/modals/vscan-modal';
import { AddProjectsModal } from 'components/modals/addprojects-modal.js';
import { ContributorsModal } from 'components/modals/contributors-modal';
import { DataContext } from 'services/datacontext';


@inject(DialogService, DataContext)
export class DialogFunctions {
  constructor(dialogService, dataContext) {
    this.dialogService = dialogService;
    this.dataContext = dataContext;
  }
  openReadmeModal(repo, target) {
    let scrollTop = document.documentElement.scrollTop;
    this.openReadmeLinkId = target.getAttribute('id');
    this.dialogService.open({ viewModel: ReadmeModal, model: repo, lock: false }).whenClosed(response => {
      if (response.wasCancelled) {
        document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
        const element = document.querySelector('#'+this.openReadmeLinkId);
        if (element) {
          element.focus();
        }
      }
    });
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

  displayVScanDialog(repo, target) {
    this.exitDialogLinkId = target.getAttribute('id');
    this.dialogService.open({viewModel: VScanModal, model: repo, lock: false}).whenClosed( reponse => {
      const element = document.querySelector('#'+this.exitDialogLinkId);
      if(element) {
        element.focus();
      }
    });
  }

  openAddProjectModal(repo, target) {
    this.addProjectLinkId = target.getAttribute('id');
    this.dialogService.open({ viewModel: AddProjectsModal, model: repo, lock: false }).whenClosed(response => {
      if (response && response.wasCancelled) {
        this.dataContext.postUsedProject(response.output, repo.id).then(data => {
          this.projectsThatUseUs.push(response.output);
        }).catch((e) => {console.log(e);});
      }
      const element = document.querySelector('#'+this.addProjectLinkId);
      if(element) {
        element.focus();
      }
    });
  }

  openContribModal(repo, target) {
    this.contributorsLinkid = target.getAttribute('id');
    this.dialogService.open({ viewModel: ContributorsModal, model: repo, lock:false }).whenClosed( response => {
      const element = document.querySelector('#'+this.contributorsLinkid);
      if(element) {
        element.focus();
      }
    });
  }
}