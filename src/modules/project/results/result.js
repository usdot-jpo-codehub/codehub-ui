import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {bindable} from 'aurelia-framework';
import {activationStrategy} from 'aurelia-router';

@inject(SearchProjectData, Router)
export class Result {
  heading = 'Projects List';

  constructor(searchProjectData, searchText) {
		this.searchProjectData = searchProjectData;
    this.projects = [];

    this.selectedOrganizations = [];
    this.selectedLanguages = [];

    this.sortDirection = "descending";

    this.selectedSort = 'default';
    this.sortOptions = [
      {value: 'rank', name: 'Rank'},
      {value: 'default', name: 'Relevance'},
      {value: 'stars', name: 'Stars'},
      {value: 'watchers', name: 'Watchers'},
      {value: 'releases', name: 'Releases'},
      {value: 'commits', name: 'Commits'},
      {value: 'contributors', name: 'Contributors'}
    ];

	}

  getViewStrategy() {
    return '../common/list.html';
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  // Creates an array of unique values for one property in an array
  getUniqueValues(array, property){

    let propertyArray = [];
    for (let object of array) {
      if(object[property]) {
        propertyArray.push(object[property]);
      }else{
        propertyArray.push("None");
      }
    }
    return Array.from(new Set(propertyArray));

  }

  activate(params, routeConfig, navigationInstruction) {
      if(!(params.searchText) || params.searchText == ''){
        return this.searchProjectData.getAll()
        .then( projects => {
          this.projects = projects;
          this.selectedOrganizations = this.getUniqueValues(this.projects, 'organization');
          this.selectedLanguages = this.getUniqueValues(this.projects, 'language');
          return this.projects;
      });
      }
      else{
        return this.searchProjectData.searchByProjectNameOrDescription(params.searchText)
        .then( projects => {
          this.projects = projects;
          this.selectedOrganizations = this.getUniqueValues(this.projects, 'organization');
          this.selectedLanguages = this.getUniqueValues(this.projects, 'language');
          return this.projects;
        });
      }
    }

}
