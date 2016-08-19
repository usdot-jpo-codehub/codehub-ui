import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DataContext } from '../services/datacontext';
import { Filters } from '../components/filters';

@inject(DataContext, Router, Filters)
export class Explore {

  constructor(dataContext, router, filters) {
    this.dataContext = dataContext;
    this.router = router;
    this.filters = filters;

    this.projects = [];

    this.projectTitle = 'Explore';

    this.sortDirection = 'descending';
    this.selectedSort = 'stars';
    this.sortOptions = [
      { value: 'rank', name: 'Rank' },
      { value: 'stars', name: 'Stars' },
      { value: 'watchers', name: 'Watchers' },
      { value: 'releases', name: 'Releases' },
      { value: 'commits', name: 'Commits' },
      { value: 'contributors', name: 'Contributors' },
    ];
  }

  gotoProject(project) {
    this.router.navigateToRoute('edit', { id: project.id });
  }

  new() {
    this.router.navigateToRoute('create');
  }

  getData() {
    return this.dataContext.getAll()
      .then(projects => {
        this.projects = JSON.parse(JSON.stringify(projects));
        this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'organization');
        this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'language');
        return this.projects;
      });
  }

  activate() {
    this.getData();
  }
}
