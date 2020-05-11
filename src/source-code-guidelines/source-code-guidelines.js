import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DialogFunctions } from '../resources/shared/dialog-functions';


@inject(Router, DialogFunctions)
export class Repopublishing {
  constructor(router, dialogFunctions) {
    this.router = router;
    this.dialogFunctions = dialogFunctions;
    this.message = 'this is the Source Code Guidelines Page';
    this.currentId= 'ul-jupiter';
    this.id='';
  }
  activate(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  moveToTag(event,id) {
    console.log("got to move to tag 1");
    event.preventDefault();
    let element = document.getElementById(`${id}`);
    if(element) {
      // due to support IE11 where scrollY is not available
      let yOff = window.scrollY ? window.scrollY : window.pageYOffset;
      let offset = window.outerHeight * .15;
      const y = element.getBoundingClientRect().top + yOff - offset;
      window.scrollTo(0, y);
      element.classList.add("referred-to-thing");
      setTimeout(function(){
        element.classList.remove("referred-to-thing");
      }, 5000);
      //
    }
  }

}
