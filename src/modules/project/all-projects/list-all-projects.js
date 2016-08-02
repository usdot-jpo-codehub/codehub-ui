import {inject} from 'aurelia-framework';
import {ProjectsExplore} from "../dataRepository/projectsExplore";
import {Router} from "aurelia-router";
import {bindable} from 'aurelia-framework';

@inject(ProjectsExplore, Router)
export class ListAllProjects {
  heading = 'Projects List';
  projectsList = [];
  projects_readme = {};
  projectTitle = "All Projects";


getViewStrategy() {
      return '../common/list.html';
  }
  constructor(projectsExplore, router) {
    this.projectsExplore = projectsExplore;
    this.router = router;
    this.projects = [];
    this.selectedOrganizations = [];
    this.selectedLanguages = [];

    this.sortDirection = "descending";

    this.selectedSort = 'stars';
    this.sortOptions = [
      {value: 'rank', name: 'Rank'},
      {value: 'stars', name: 'Stars'},
      {value: 'watchers', name: 'Watchers'},
      {value: 'releases', name: 'Releases'},
      {value: 'commits', name: 'Commits'},
      {value: 'contributors', name: 'Contributors'}
    ];

  };

  gotoProject(project){
    this.router.navigateToRoute('edit', { id: project.id })
  };

  new(){
    this.router.navigateToRoute('create');
  };


  getData() {
    return this.projectsExplore.getAll()
      .then(projects => {
        this.projects = JSON.parse(JSON.stringify(projects));
        this.selectedOrganizations = this.getUniqueValues(this.projects, 'organization');
        this.selectedLanguages = this.getUniqueValues(this.projects, 'language');
        return this.projects;
     });
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
  activate() {
      this.getData();
  }
}
