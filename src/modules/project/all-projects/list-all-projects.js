import {inject} from 'aurelia-framework';
import {ProjectAllStaticData} from "./projectAllStaticData";
import {Router} from "aurelia-router";
import {bindable} from 'aurelia-framework';

@inject(ProjectAllStaticData, Router)
export class ListAllProjects {
  heading = 'Projects List';
  projectsList = [];
  constructor(data, router) {
    this.service = data;
    this.currentPage = 0;
    this.router = router;
    this.projects = [];
    this.orgs = ["boozallen", "booz-allen-hamilton", "netflix"];
  };

  gotoProject(project){
    this.router.navigateToRoute('edit', { id: project.id })
  };

  new(){
    this.router.navigateToRoute('create');
  };

  getData(org) {
    this.currentPage++;
    this.service.getAll(org)
      .then(projects => {
          this.projectsList = JSON.parse(JSON.stringify(projects));
          for(var i = 0; i < this.projectsList.length; i++){
            this.projects.push(this.projectsList[i]);
          }
     });

  }
  activate() {
    for(var i=0;i<this.orgs.length; i++){
      this.getData(this.orgs[i]);
    }

  }
}
