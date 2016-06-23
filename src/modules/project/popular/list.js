import {inject} from 'aurelia-framework';
import {ProjectData} from "../dataRepository/projectData";
import {Router} from "aurelia-router";

@inject(ProjectData, Router)
export class List {
  heading = 'Projects List';
  queries = [];
  projectTitle = "Most Popular Projects";

  constructor(projectData, router) {
    this.projectData = projectData;
    this.currentPage = 0;
    this.router = router;
  };

  getViewStrategy() {
        return '../common/list.html';
    }
  gotoProject(project){
    this.router.navigateToRoute('edit', { id: project.id })
  };

  new(){
    this.router.navigateToRoute('create');
  };

  getData() {
    this.currentPage++;
    return this.projectData.getAll()
      .then(projects => {
       this.projects = projects;

     });

  }

  activate() {
    return this.getData();
  }
}
