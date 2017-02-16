import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import * as c3 from 'c3';
import { DataContext } from 'services/datacontext';

@inject(DataContext, Router)
export class Insight {

  constructor(dataContext, router) {
    this.dataContext = dataContext;
    this.router = router;

    this.insights = [];

    this.mostUsedLanguages = {};
  }

  getData() {
    return this.dataContext.findEnterpriseInsight().then(results => {
      this.insights = results;
      this.buildCharts();
    });
  }

  activate() {
    this.getData();
  }

  buildCharts() {
    this.mostUsedLanguages = c3.generate({
      bindto: '#mostUsedLanguages',
      data: {
        columns: Object.entries(this.insights.language_counts_stat),
        type: 'donut',
      },
    });
  }

  deactivate() {
    this.mostUsedLanguages.destroy();
  }

}
