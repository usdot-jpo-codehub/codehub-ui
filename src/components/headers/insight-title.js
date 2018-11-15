import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DataContext } from 'services/datacontext';

@inject(DataContext)
export class InsightTitle {
  constructor(dataContext) {
    this.dataContext = dataContext;
    this.lastUpdated = 'Hello';
  }

  getData() {
    this.dataContext.getLastProcessedDateTime().then(results => {
      this.lastUpdated = results;
      return this.lastUpdated;
    });
  }

  activate() {
    this.getData();
  }
}
