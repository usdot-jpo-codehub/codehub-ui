import {inject} from 'aurelia-framework';
import {ProjectAllStaticData} from "../dataRepository/projectAllStaticData";
import {Router} from "aurelia-router";
import {bindable} from 'aurelia-framework';

@inject(ProjectAllStaticData, Router)
export class ListAllProjects {
  heading = 'Projects List';
  projectsList = [];
  projects_readme = {};
  projectTitle = "All Projects";



getViewStrategy() {
      return '../common/list.html';
  }
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
            //this.projectsList[i].readme_url = this.getReadMeUrl(this.projectsList[i].full_name);
            this.projects.push(this.projectsList[i]);

          }
     });

  }

  getReadMeUrl(repo_login){
    this.service.getReadMeUrl(repo_login)
      .then(projects_readme => {
          this.projectsList = JSON.parse(JSON.stringify(projects_readme));
          console.log(this.projectsList);

     });
  }

  activate() {

    for(var i=0;i<this.orgs.length; i++){
      this.getData(this.orgs[i]);
    }
  }
}
