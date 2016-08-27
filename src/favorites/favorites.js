// TODO Non-functional placeholder replica of most popular

import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DataContext } from '../services/datacontext';
import { Filters } from '../components/filters';

@inject(DataContext, Router, Filters)
export class Favorites {

  constructor(dataContext, router, filters) {
    this.dataContext = dataContext;
    this.router = router;
    this.filters = filters;

    this.projects = [];

    this.projectTitle = 'Favorite Projects';

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

}
