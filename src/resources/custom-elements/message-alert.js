import { inject, bindable, bindingMode } from 'aurelia-framework';
import $ from 'jquery';


@inject(Element)
export class MessageAlert {
  @bindable message;
  @bindable icon;
  @bindable active;

  constructor(element) {
    this.element = element;
  }

  dismiss() {
    $(this.element).hide();
    this.focusActiveMenu();
  }

  focusActiveMenu() {
    const titleBarNav = document.querySelector('#titleBarNav');
    if(!titleBarNav)
      return;
    let items = titleBarNav.getElementsByTagName('li');
    if(!items)
      return;

    for(let item of items) {
      if(item.classList.contains('active')) {
        let links = item.getElementsByTagName('a');
        if(!links)
          continue;
        let a = links[0];
        if(!a)
          return;
        a.focus();
        break;
      }
    }
  }
}
