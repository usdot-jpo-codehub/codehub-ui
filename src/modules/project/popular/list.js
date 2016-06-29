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
    this.router = router;
    this.projects = [];
    this.orgs = ["boozallen","netflix"];
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

  attached(){
    //this.getSortedProject(this.projects);
  }

getData(org) {
  this.currentPage++;
  return this.projectData.getAll(org)
    .then(projects => {
     projects = JSON.parse(JSON.stringify(projects));
     projects.forEach(proj => {
       var index = projects.indexOf(proj);
       this.getNumberofContributors(proj.full_name)
       .then(contributors => {
          var accumulated_sum = 0;
          for (var contributor of contributors){
            accumulated_sum = contributor.total + accumulated_sum;
          }
          if(contributors && contributors.length >= 0){
            proj.contributors = contributors.length;
            proj.commits = accumulated_sum;
            proj.total_score = proj.contributors +   proj.commits + proj.stargazers_count;
          }
          if(!contributors){
            proj.contributors = 0;
            proj.commits = accumulated_sum;
            proj.total_score = proj.commits + proj.stargazers_count;
          }
        return proj;
      });
      return proj;
    })
     this.projects = projects;
     return this.projects;
   });

}
  getSortedProject(projects){
    projects.sort(function(proj_1, proj_2) {
    return  proj_2.total_score - proj_1.total_score;
    });
    return projects;
  }
  getNumberofContributors(owner_repo) {
     return this.projectData.getNumberofContributors(owner_repo)
       .then(projects_cont => {
        return projects_cont;
      });

   }

   getNumberofCommits(owner_repo) {
     return this.projectData.getNumberofCommits(owner_repo)
       .then(projects_commits => {
        return projects_commits;
      });

   }
 activate() {
    for(var i = 0;i < this.orgs.length; i++){
     this.getData(this.orgs[i]);
     }

  }

}
