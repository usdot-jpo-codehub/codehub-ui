import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class SideNav {

  constructor(router) {
    this.router = router;
  }
}
