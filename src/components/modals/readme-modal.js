import { inject, TaskQueue } from 'aurelia-framework';
import { DialogController, DialogService } from 'aurelia-dialog';
import { Router } from 'aurelia-router';
import { LeavingModal } from './leaving-modal';

@inject(DialogController, Router, TaskQueue, DialogService)
export class ReadmeModal {
  constructor(controller, router, taskQueue, dialogService) {
    this.controller = controller;
    // this.controller.settings.centerHorizontalOnly = true;
    this.controller.settings.lock = false;

    this.router = router;
    this.taskQueue = taskQueue;
    this.dialogService = dialogService;
  }

  activate(repo, navigationInstruction) {
    this.repo = repo;
  }

  attached() {
    this.taskQueue.queueMicroTask(() => {
      const anchors = document.getElementsByTagName('a');
      const self = this;

      for (let i = 0; i < anchors.length; i++) {
        anchors[i].onclick = function na(event) {
          if (event.target.tagName.toLowerCase() === 'a') {
            if (event.target.href.includes(document.location.origin)) {
              const ts = event.target.href.substring(document.location.origin.length + 1);
              if (ts[0] === '#') {
                return true;
              }
            } else {
              self.openLeavingSiteConfirmation('redirection', event.target.href);
            }
          }
          return false;
        };
      }
    });
  }

  navigateAndClose() {
    this.router.navigateToRoute('project-details', { id: this.repo.id });
    this.controller.cancel();
  }

  openLeavingSiteConfirmation(name, url) {
    const mdl = { name, url };
    this.dialogService.open({ viewModel: LeavingModal, model: mdl });
  }

}
