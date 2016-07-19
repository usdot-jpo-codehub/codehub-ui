import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)

export class Modal {
   constructor(controller){
      this.controller = controller;
      controller.settings.centerHorizontalOnly = true;
      controller.settings.lock = false;
   }

   activate(repo) {
      this.repo = repo;
   }
}