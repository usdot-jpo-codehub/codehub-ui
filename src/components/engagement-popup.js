import { inject } from 'aurelia-framework';
import { ES_MSG_ENGAGEMENTPOPUP_DATA } from '../constants/ch-constants';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, EventAggregator)
export class EngagementPopup {
  constructor(element, eventAggregator) {
    this.element = element;
    this.eventAggregator = eventAggregator;
    this.data = null;
    this.eaSubscription = null;
  }

  attached() {
    this.eaSubscription = this.eventAggregator.subscribe(ES_MSG_ENGAGEMENTPOPUP_DATA, engagementPopups => {
      this.data = engagementPopups && engagementPopups.length>0 ? engagementPopups[0] : null;
    });
  }

  detached() {
    if (this.eaSubscription) {
      this.eaSubscription.dispose();
    }
  }
}