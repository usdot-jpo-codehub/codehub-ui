import { inject, bindable } from 'aurelia-framework';
import { activationStrategy } from 'aurelia-router';
import { DataContext } from '../services/datacontext';
import { Filters } from '../components/filters';

@inject(DataContext, Filters)
export class Results {

  constructor(dataContext, filters) {
    this.dataContext = dataContext;
    this.filters = filters;

    this.projects = [];

    this.selectedOrganizations = [];
    this.selectedLanguages = [];

    this.sortDirection = 'descending';

    this.selectedSort = 'default';
    this.sortOptions = [
      { value: 'rank', name: 'Rank' },
      { value: 'default', name: 'Relevance' },
      { value: 'stars', name: 'Stars' },
      { value: 'watchers', name: 'Watchers' },
      { value: 'releases', name: 'Releases' },
      { value: 'commits', name: 'Commits' },
      { value: 'contributors', name: 'Contributors' },
    ];
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  activate(params) {
    if (!(params.searchText) || params.searchText === '') {
      return this.dataContext.getAll()
        .then(projects => {
          this.projects = projects;
          this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'organization');
          this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'language');
          return this.projects;
        });
    }

    return this.dataContext.searchByProjectNameOrDescription(params.searchText)
      .then(projects => {
        this.projects = projects;
        this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'organization');
        this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'language');
        return this.projects;
      });
  }

}
