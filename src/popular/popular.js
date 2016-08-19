import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DataContext } from '../services/datacontext';

@inject(DataContext, Router)
export class Popular {

  projectTitle = 'Most Popular Projects';

  constructor(dataContext, router) {
    this.dataContext = dataContext;
    this.router = router;
    this.projects = [];

    this.selectedOrganizations = [];
    this.selectedLanguages = [];

    this.sortDirection = 'descending';
    this.landing = true;

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
      this.selectedOrganizations = this.getUniqueValues(this.projects, 'organization');
      this.selectedLanguages = this.getUniqueValues(this.projects, 'language');
      return this.projects;
    });
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

  activate() {
    this.getData();
  }

}
