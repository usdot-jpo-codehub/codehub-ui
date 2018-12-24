import { inject, bindable, bindingMode } from 'aurelia-framework';
import $ from 'bootstrap';


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
  }
}
