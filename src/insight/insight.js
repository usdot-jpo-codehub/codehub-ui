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
    let mul = this.insights.language_counts_stat;
    mul = Object.entries(mul);
    mul.sort(this.multiArraySecondColumnDesc);
    const mulTop = mul.slice(0, 5);
    const mulBot = mul.slice(6, mul.length);

    const mulOther = mulBot.reduce((a, b) => b[1] + a, 0);

    mulTop.push([`Other(${mulBot.length})`, mulOther]);

    this.mostUsedLanguages = c3.generate({
      bindto: '#mostUsedLanguages',
      data: {
        columns: mulTop,
        type: 'donut',
      },
      color: {
        pattern: ['#85C241', '#BAD432', '#009343', '#F7B719', '#BAD432', '#009343'],
      },
      donut: {
        width: 80,
        title: 'Languages',
      },
    });

    var chart = c3.generate({
      bindto: '#languageChart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ],
        types: {
          data1: 'bar',
        }
      },
      axis: {
        rotated: true
      }
    });

  }

  deactivate() {
    this.mostUsedLanguages.destroy();
  }

  multiArraySecondColumnDesc(a, b) {
    if (a[1] === b[1]) {
      return 0;
    }
    return (a[1] > b[1]) ? -1 : 1;
  }

}
