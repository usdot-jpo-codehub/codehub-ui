import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class SideNav {

  constructor(router) {
    this.router = router;
    this.currentId= 'ul-jupiter';
    this.id='';
  }

  isVisible(id) {
    return this.router.currentInstruction.config.name == id;
  }

  moveToTag(event,id) {
    event.preventDefault();
    let element = document.getElementById(`${id}`);
    if(element) {
      // due to support IE11 where scrollY is not available
      let yOff = window.scrollY ? window.scrollY : window.pageYOffset;
      let offset = window.outerHeight * .15;
      const y = element.getBoundingClientRect().top + yOff - offset;
      window.scrollTo(0, y);
    }
  }
}
