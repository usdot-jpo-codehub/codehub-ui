import { inject, bindable } from 'aurelia-framework';
import { Router, activationStrategy } from 'aurelia-router';
import { DataContext } from '../services/datacontext';

@inject(DataContext, Router)
export class Results {

  constructor(dataContext, searchText) {
    this.dataContext = dataContext;

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

  toggleOrg(source) {
    if (document.getElementsByName('toggleOrg')[0].checked) {
      this.selectedOrganizations = this.getUniqueValues(this.projects, 'organization');
      return true;
    }
    this.selectedOrganizations = [];
    return true;
  }

  toggleLang() {
    if (document.getElementsByName('toggleLang')[0].checked) {
      this.selectedLanguages = this.getUniqueValues(this.projects, 'language');
      return true;
    }
    this.selectedLanguages = [];
    return true;
  }

  // Creates an array of unique values for one property in an array
  getUniqueValues(array, property) {
    const propertyArray = [];
    for (const object of array) {
      if (object[property]) {
        propertyArray.push(object[property]);
      } else {
        propertyArray.push('None');
      }
    }
    return Array.from(new Set(propertyArray));
  }

  activate(params) {
    if (!(params.searchText) || params.searchText === '') {
      return this.dataContext.getAll()
        .then(projects => {
          this.projects = projects;
          this.selectedOrganizations = this.getUniqueValues(this.projects, 'organization');
          this.selectedLanguages = this.getUniqueValues(this.projects, 'language');
          return this.projects;
        });
    }

    return this.dataContext.searchByProjectNameOrDescription(params.searchText)
      .then(projects => {
        this.projects = projects;
        this.selectedOrganizations = this.getUniqueValues(this.projects, 'organization');
        this.selectedLanguages = this.getUniqueValues(this.projects, 'language');
        return this.projects;
      });
  }

}
