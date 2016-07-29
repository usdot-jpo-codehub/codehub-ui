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

    this.selectedOrganizations = [];
    this.selectedLanguages = [];

    this.sortDirection = "descending";

    this.selectedSort = 'rank';
    this.sortOptions = [
      {value: 'rank', name: 'Rank'},
      {value: 'stars', name: 'Stars'},
      {value: 'watchers', name: 'Watchers'},
      {value: 'releases', name: 'Releases'},
      {value: 'commits', name: 'Commits'},
      {value: 'contributors', name: 'Contributors'}
    ];
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

  getData() {
    return this.projectData.getAll().then(results => {
      this.projects = results;
      this.selectedOrganizations = this.getUniqueValues(this.projects, 'organization');
      this.selectedLanguages = this.getUniqueValues(this.projects, 'language');
      return this.projects;
    });
  }

  getData() {
    return this.projectData.getAll().then(results => {
      this.projects = results;
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
      this.getData();
 }

}
