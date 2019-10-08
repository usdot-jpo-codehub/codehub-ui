import { inject, bindable } from 'aurelia-framework';

@inject(Element)
export class EmailRegistration {
  @bindable active;
  constructor(element) {
    this.element = element;
    this.valid = true;
    this.email = '';
  }

  attached() {
    this.focus_input();
  }

  close() {
    $(this.element).hide();
    this.focusActiveMenu();
  }

  signup() {
    if (this.validate_email()) {
      console.log('email is valid');
      // Insert backend call here 
      $(this.element).hide();
      this.focusActiveMenu();
    } else {
      this.valid = false;
      this.email = '';
      this.focus_input();
    }
  }

  focus_input() {
    let elem = document.querySelector('#input-email-address');
      if (elem) {
        elem.focus();
      }
  }

  validate_email() {
    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(this.email);
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
        found = true;
        searchBarElement.focus();
      }
    }
    if(!found) { //search for project name in project details
      const projectDetailsProjectName = document.querySelector('#project-details-project-name');
      if(projectDetailsProjectName) {
        found = true;
        projectDetailsProjectName.focus();
      }
    }
  }
}