import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';


@inject(Router)
export class About {
  constructor(router) {
    this.router = router;
    this.message = 'this is the About Page';
  }
}