import { inject } from 'aurelia-framework';
import * as browser from 'detect-browser';
import $ from 'bootstrap';

@inject(Element)
export class BrowserAlert {
  constructor(element) {
    this.element = element;

    this.browser = browser;
    this.compat = (browser.name === 'chrome') || (browser.name === 'firefox');
  }

  dismiss() {
    $(this.element).hide();
  }
}
