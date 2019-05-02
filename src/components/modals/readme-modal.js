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
    this.exitDialogLinkId = null;
    this.visible = true;
  }

  activate(repo, navigationInstruction) {
    this.repo = repo;
  }

  attached() {
    const self = this;
    this.taskQueue.queueMicroTask(() => {
      const readmeObj = document.querySelector('#readme-content');
      const anchors = readmeObj.getElementsByTagName('a');
      for (let i = 0; i < anchors.length; i++) {
        anchors[i].onclick = function na(event) {
          if (event.target.tagName.toLowerCase() === 'a') {
            if (event.target.href.includes(document.location.origin)) {
              const ts = event.target.href.substring(document.location.origin.length + 1);
              if (ts[0] === '#') {
                return true;
              }
            } else {
              self.openLeavingSiteConfirmation(event.target.innerHTML, event.target.href, event.target);
            }
          }
          return false;
        };
      }
      const readmeTitle = document.querySelector('#readme-title');
      readmeTitle.focus();
    });
  }

  navigateAndClose() {
    this.router.navigateToRoute('project-details', { id: this.repo.id });
    this.controller.ok();
  }

  openLeavingSiteConfirmation(name, url, target) {
    this.visible = false;
    this.exitDialogLinkId = target.getAttribute('id') ? target.getAttribute('id') : 'no-id-detected';
    const mdl = { name, url };
    this.dialogService.open({ viewModel: LeavingModal, model: mdl, lock: false }).whenClosed( response => {
      this.visible = true;
      setTimeout(() => {
        const element = document.querySelector('#'+this.exitDialogLinkId);
        if(element) {
          element.focus();
        } else {
          const readmeTitle = document.querySelector('#readme-title');
          readmeTitle.focus();
        }
      },200);
    });
  }
}
