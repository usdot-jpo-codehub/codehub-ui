import { inject, computedFrom, bindable, bindingMode} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import CHContants from '../constants/ch-constants';

@inject(EventAggregator)
export class CarouselCard {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) repositories = [];
  @bindable({ defaultBindingMode: bindingMode.oneWay }) caption;

  constructor(eventAggregator) {
    this.currentIndex = -1;
    this.currentCenter = 1;
    this.numRepos = 3
    this.eventAggregator = eventAggregator;
  }

  attached() {
    this.subscription = this.eventAggregator.subscribe(CHContants.EA_MS_FEATURED_DATA, repositories => {
      this.repositories = repositories;
      this.rotateRight();
    });
  }

  detached() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  }

  @computedFrom('currentIndex')
  get currentRepositories() {
    let repos = [null, null, null];
    
    if (this.repositories && this.repositories.length==0 || this.currentIndex<0) {
      return repos;
    }
    let c = this.currentIndex;
    for(let i=0; i<this.numRepos; i++) {
      if (c >= this.repositories.length) {
        c = 0;
      }
      repos[i] = this.repositories[c];
      c += 1;
    }
    return repos;
  }

  centerTile(index) {
    this.currentCenter = index;
    if ((index - 1)<0) {
      this.currentIndex = this.repositories.length-1;
    } else {
      this.currentIndex = index - 1;
    }
  }

  rotateLeft() {
    
    if (this.currentIndex -1 < 0) {
      this.currentIndex = this.repositories.length-1;
    } else {
      this.currentIndex--;
    }

    this.adjustCurrentCenter(this.currentIndex);
  }

  rotateRight() {
    if(this.currentIndex + 1 >= this.repositories.length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }

    this.adjustCurrentCenter(this.currentIndex);
  }

  adjustCurrentCenter(currentIndex) {
    if (currentIndex + 1 >= this.repositories.length) {
      this.currentCenter = 0;
    } else {
      this.currentCenter = currentIndex + 1;
    }
  }
}