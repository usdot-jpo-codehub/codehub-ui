import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {bindable} from 'aurelia-framework';

@inject(SearchProjectData, Router)
export class ProjectDetailsPopular {

  constructor(searchProjectData, searchProject, searchText) {
		this.searchProjectData = searchProjectData;
    this.searchProject = searchProject;
	}

  getViewStrategy() {
        return '../common/project-details.html';
    }
	activate(params, routeConfig, navigationInstruction) {
    return this.searchProjectData.searchByProjectNameOrDescription(params.id).then(projects=> {
			this.projects = projects;
		});

	}

}
