import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DataContext } from '../services/datacontext';

@inject(DataContext, Router)
export class Explore {
  getViewStrategy() {
    return '../common/list.html';
  }

  constructor(projectsExplore, router) {
    this.projectsExplore = projectsExplore;
    this.router = router;

    this.projectTitle = 'Explore';

    this.projects = [];
    this.selectedOrganizations = [];
    this.selectedLanguages = [];

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
    return this.projectsExplore.getAll()
      .then(projects => {
        this.projects = JSON.parse(JSON.stringify(projects));
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
