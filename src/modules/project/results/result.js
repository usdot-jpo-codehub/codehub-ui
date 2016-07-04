import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {bindable} from 'aurelia-framework';

@inject(SearchProjectData, Router)
export class Result {
  heading = 'Projects List';

  constructor(searchProjectData, searchProject, searchText) {
		this.searchProjectData = searchProjectData;
    this.searchProject = searchProject;
    this.projects = [];
    this.orgs = ["boozallen","booz-allen-hamilton","netflix"];
	}

  activate(params, routeConfig, navigationInstruction) {
    return this.searchProjectData.getAllProjects(this.orgs)
    .then( projects => {
      var projs = JSON.parse(JSON.stringify(projects));
      if(!(params.searchText) || params.searchText == ''){
        var projList = [];
        for(var projArr of projs){
          for(var proj of projArr){
            projList.push(proj);
          }
        }
        this.projects = projList;
        return this.projects;
      }
      else{
        var projList = [];
        for(var projArr of projs){
          for(var proj of projArr){
          if(new RegExp(params.searchText,"i").test(proj.full_name) || new RegExp(params.searchText,"i").test(proj.description)){
            projList.push(proj);
          }

        }

      }
      this.projects = projList;
      return this.projects;
      }
    });

	}
}
