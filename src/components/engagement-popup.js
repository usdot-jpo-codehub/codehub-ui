import { inject } from 'aurelia-framework';
import CHContants from '../constants/ch-constants';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, EventAggregator)
export class EngagementPopup {
  constructor(element, eventAggregator) {
    this.element = element;
    this.eventAggregator = eventAggregator;
    this.data = null;
    this.eaSubscription = null;
    this.isVisible = true;
    this.isClosed = false;
    this.noShowChecked = false;
  }

  attached() {
    this.eaSubscription = this.eventAggregator.subscribe(CHContants.ES_MSG_ENGAGEMENTPOPUP_DATA, engagementPopups => {
      this.data = engagementPopups && engagementPopups.length>0 ? engagementPopups[0] : null;
      this.isVisible = this.getUserSelection(this.data);
    });
  }

  detached() {
    if (this.eaSubscription) {
      this.eaSubscription.dispose();
    }
  }

  close() {
    this.isClosed = true;
    setTimeout(()=>{
      this.isVisible = false;
    },500);
  }

  noShowClicked(event) {
    this.noShowChecked = !this.noShowChecked;
    if (this.data) {
      window.localStorage.setItem(CHContants.LS_CODEHUB_ENGAGEMENT_POPUP, this.data.id);
      this.close();
    }
    return true;
  }

  getUserSelection(data) {
    let val = window.localStorage.getItem(CHContants.LS_CODEHUB_ENGAGEMENT_POPUP);
    if (!val) {
      return true;
    }
    return val != data.id;
  }
}