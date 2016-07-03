import {inject} from 'aurelia-framework';
import {ProjectData} from "../dataRepository/projectData";
import {Router} from "aurelia-router";

@inject(ProjectData, Router)
export class List {
  heading = 'Projects List';
  projectTitle = "Most Popular Projects";

  constructor(projectData, router) {
    this.projectData = projectData;
    this.currentPage = 0;
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

  }

getData(orgs) {
  var contributor_list = [];
  return this.projectData.getAll(orgs).then(results => {
    for(var proj of results){
      for(var p of proj){
        this.projects.push(this.getEachProjectContributors(p));
      }
    }
    return this.projects;
  });
}

getEachProjectContributors(proj){
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
              proj.total_score = proj.stargazers_count;
            }
          return proj;
        });

      return proj;
}

  getSortedProject(projects){
    projects.sort(function(proj_1, proj_2) {
    return  proj_2.total_score - proj_1.total_score;
    });
    var sliced = projects.slice(0,21);

    sliced.sort(function(proj_1, proj_2) {
    return  proj_2.total_score - proj_1.total_score;
    });
    return sliced;
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
    this.getData(this.orgs);
  }

}
