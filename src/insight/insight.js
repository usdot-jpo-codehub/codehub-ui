import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import * as c3 from 'c3';
import { DataContext } from 'services/datacontext';
import { Filters } from 'components/filters';

@inject(DataContext, Router, Filters)
export class Insight {

  constructor(dataContext, router, filters) {
    this.dataContext = dataContext;
    this.router = router;
    this.filters = filters;

    this.projects = [];

    this.projectTitle = 'Insight';

    this.sortDirection = 'descending';
    this.selectedSort = 'rank';
    this.sortOptions = [
      { value: 'rank', name: 'Rank' },
      { value: 'stars', name: 'Stars' },
      { value: 'watchers', name: 'Watchers' },
      { value: 'releases', name: 'Releases' },
      { value: 'commits', name: 'Commits' },
      { value: 'contributors', name: 'Contributors' },
    ];
  }

  getData() {
    return this.dataContext.findPopular().then(results => {
      this.projects = results;
      this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'organization');
      this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'language');
      return this.projects;
    });
  }

  activate() {
    this.getData();
  }

  attached() {
    const chart = c3.generate({
      bindto: '#chart',
      legend: {
        position: 'inset',
        inset: {
          anchor: 'top-left',
        },
      },
      data: {
        columns: [
          ['data1', 30],
          ['data2', 120],
        ],
        type: 'donut',
        // onclick: function (d, i) {
        //   console.log('onclick', d, i);
        // },
        // onmouseover: function (d, i) {
        //   console.log('onmouseover', d, i);
        // },
        // onmouseout: function (d, i) {
        //   console.log('onmouseout', d, i);
        // }
      },
      donut: {
        title: 'Iris Petal Width',
      },
    });
  }

}
