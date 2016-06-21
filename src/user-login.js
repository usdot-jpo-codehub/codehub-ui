
import {bindable, bindingMode} from 'aurelia-framework';

export class UserLogin{
  @bindable({ defaultBindingMode: bindingMode.twoWay }) userName = '';
}
