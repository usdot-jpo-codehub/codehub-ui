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
    return this.service.getAll(org)
      .then(projects => {
          this.projects = JSON.parse(JSON.stringify(projects));
          return this.projects;
     }).then(projects =>{
        projects.forEach(proj =>{
          this.getReadMeUrl(proj.full_name)
          .then(readme_url =>{
            proj.readme_url = readme_url;
            return proj;
          });
        return projects;
        })
     });

  }

  getReadMeUrl(repo_full_name){
    return this.service.getReadMeUrl(repo_full_name)
      .then(projects_readme => {
          return projects_readme;
     })
  }

  activate() {

    for(var i=0;i<this.orgs.length; i++){
      this.getData(this.orgs[i]);
    }
  }
}
