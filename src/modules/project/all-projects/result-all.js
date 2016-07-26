import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {SearchProjectData} from "../dataRepository/searchProjectData";
//import {SearchProject} from "./search-project";
import {bindable} from 'aurelia-framework';

@inject(SearchProjectData, Router)
export class ResultAll {
  heading = 'Projects List';

  constructor(searchProjectData, searchProject, searchText) {
		this.searchProjectData = searchProjectData;
    this.searchProject = searchProject;
	}

  getViewStrategy() {
        return '../common/result.html';
    }

	activate(params, routeConfig, navigationInstruction) {
    return this.searchProjectData.searchByProjectNameOrDescription(params.searchText).then(projects=> {
			this.projects = projects;
		});

	}

}
