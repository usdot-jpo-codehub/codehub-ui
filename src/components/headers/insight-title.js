import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DataContext } from 'services/datacontext';

@inject(DataContext)
export class InsightTitle {
  constructor(dataContext) {
    this.dataContext = dataContext;
    this.lastUpdated = null;
  }

  getData() {
    // this.dataContext.getLastProcessedDateTime().then(results => {
    //   this.lastUpdated = this.getLocalDateTime(results);
    //   return this.lastUpdated;
    // });
  }

  getLocalDateTime(dateTimeString) {
    let result = null;
    if (dateTimeString) {
      let dts = dateTimeString;
      if(!dts.includes('Z')) {
        dts += ' Z';
      }
      let dt = new Date(dts);
      if (Object.prototype.toString.call(dt) === "[object Date]") {
        if (!isNaN(dt.getTime())) {
          result = dt.toLocaleString();
        }
      }
    }
    return result;
  }

  activate() {
    this.getData();
  }
}
