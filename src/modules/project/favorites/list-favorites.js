// TODO Non-functional placeholder replica of most popular

import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { SearchProjectData } from '../dataRepository/searchProjectData';

@inject(SearchProjectData, Router)
export class List {
  heading = 'Projects List';
  projectTitle = 'Favorite Projects';

  constructor(projectData, router) {
    this.projectData = projectData;
    this.currentPage = 0;
    this.router = router;
    this.projects = [];
    this.orgs = ['boozallen', 'netflix'];

    this.selectedOrganizations = [];
    this.selectedLanguages = [];

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

  getViewStrategy() {
    return '../common/list.html';
  }

  gotoProject(project) {
    this.router.navigateToRoute('edit', { id: project.id });
  }

  new() {
    this.router.navigateToRoute('create');
  }

  attached() {

  }

  getData() {
    return this.projectData.getPopular().then(results => {
      this.projects = results;
      this.selectedOrganizations = this.getUniqueValues(this.projects, 'organization');
      this.selectedLanguages = this.getUniqueValues(this.projects, 'language');
      return this.projects;
    });
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
