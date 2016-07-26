import {inject} from 'aurelia-framework';
import {ProjectsExplore} from "../dataRepository/projectsExplore";
import {Router} from "aurelia-router";
import {bindable} from 'aurelia-framework';

@inject(ProjectsExplore, Router)
export class ListAllProjects {
  heading = 'Projects List';
  projectsList = [];
  projects_readme = {};
  projectTitle = "All Projects yep";


getViewStrategy() {
      return '../common/list.html';
  }
  constructor(projectsExplore, router) {
    this.projectsExplore = projectsExplore;
    this.router = router;
    this.projects = [];
  };

  gotoProject(project){
    this.router.navigateToRoute('edit', { id: project.id })
  };

  new(){
    this.router.navigateToRoute('create');
  };


  getData() {
    return this.projectsExplore.getAll()
    then(results => {
      this.projects = results;
      console.log(this.projects);
      return this.projects;
    });
  }
  activate() {
      this.getData();
  }
}
