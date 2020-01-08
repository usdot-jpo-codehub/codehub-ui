import { inject } from 'aurelia-framework';
import { activationStrategy } from 'aurelia-router';
import { DataContext } from 'services/datacontext';
import { DialogService } from 'aurelia-dialog';
import { LeavingModal } from '../../components/modals/leaving-modal';
import { StageConfig } from '../../stageConf';
import { VScanModal } from '../../components/modals/vscan-modal';

@inject(DataContext, DialogService, StageConfig)
export class ProjectDetailsHeader {

  constructor(dataContext, dialogService, stageConfig) {
    this.dataContext = dataContext;
    this.dialogService = dialogService;
    this.stageConfig = stageConfig;

    this.repo = {};
    this.exitDialogLinkId = null

    // TODO Have some sort of loading text or loading animation while dataContext loads
    // this.repo.project_name = 'Loading...';
    // this.repo.language = 'Loading...';
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  activate(params) {
    this.dataContext.findById(params.id).then(repo => {
      this.repo = repo;
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
}
