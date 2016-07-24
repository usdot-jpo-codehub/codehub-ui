import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {bindable} from 'aurelia-framework';

@inject(SearchProjectData, Router)
export class Result {
  heading = 'Projects List';

  constructor(searchProjectData, searchText) {
		this.searchProjectData = searchProjectData;
    this.projects = [];

	}

  activate(params, routeConfig, navigationInstruction) {
      if(!(params.searchText) || params.searchText == ''){
        return this.searchProjectData.getAll()
        .then( projects => {
        this.projects = projects;
        return this.projects;
      });
      }
      else{
        return this.searchProjectData.searchByProjectNameOrDescription(params.searchText)
        .then( projects => {
        this.projects = projects;
        return this.projects;
        });
      }
    }

}
