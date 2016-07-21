import { inject } from 'aurelia-framework';
import Showdown from 'showdown';

@inject(Element)
export class MarkdownCustomAttribute {

  constructor(element) {
    this.element = element;
    this.Converter = new Showdown.Converter();
  }

  valueChanged(newValue, oldValue) {
    this.element.innerHTML = this.Converter.makeHtml(
      newValue
        .split('\n')
        .map(line => line.trim())
        .join('\n')
    );
  }
}
