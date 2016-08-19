import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DataContext } from '../services/datacontext';

@inject(DataContext, Router)
export class Popular {

  constructor(dataContext, router) {
    this.dataContext = dataContext;
    this.router = router;

    this.projects = [];

    this.projectTitle = 'Most Popular Projects';

    this.landing = true;

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
    return this.dataContext.getPopular().then(results => {
      this.projects = results;
      return this.projects;
    });
  }

  activate() {
    this.getData();
  }

}
