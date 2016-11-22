import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Router } from 'aurelia-router';

@inject(DialogController, Router)
export class ReadmeModal {
  constructor(controller, router) {
    this.controller = controller;
    //this.controller.settings.centerHorizontalOnly = true;
    this.controller.settings.lock = false;

    this.router = router;
  }

  activate(repo, navigationInstruction) {
    this.repo = repo;
  }

  navigateAndClose() {
    this.router.navigateToRoute('project-details', {id:this.repo.id});
    this.controller.cancel();
  }

}
