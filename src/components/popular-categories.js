import { inject, bindable, bindingMode } from 'aurelia-framework';
import CHContants from '../constants/ch-constants';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class PopularCategories {
  @bindable({defaultBindingMode: bindingMode.oneWay}) caption;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.eaSubscription = null;
    this.categories = []
  }

  attached() {
    this.eaSubscription = this.eventAggregator.subscribe(CHContants.ES_MSG_CATEGORIES_DATA, categories => {
      let popularCategories = categories.filter( x => {return x.isPopular == true;});
      popularCategories.sort((a, b) => {
        if (a.orderPopular > b.orderPopular) {
          return 1;
        } if(a.orderPopular == b.orderPopular) {
          if (a.name >= b.name) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return -1;
        }
      });
      this.categories = popularCategories;
    });
  }

  detached() {
    if (this.eaSubscription) {
      this.eaSubscription.dispose();
    }
  }
}