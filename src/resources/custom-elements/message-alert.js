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

    let found = false;
    for(let item of items) { //search for the active page to focus
      if(item.classList.contains('active')) {
        let links = item.getElementsByTagName('a');
        if(!links)
          continue;
        let a = links[0];
        if(!a)
          return;
        a.focus();
        found = true;
        break;
      }
    }
    if(!found) { //seach for the search bar to focus
      const searchBarElement = document.querySelector('#searchBar');
      if(searchBarElement) {
        searchBarElement.focus();
      }
    }
  }
}
