import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {bindable} from 'aurelia-framework';

@inject(SearchProjectData, Router)
export class ProjectDetailsPopular {
  heading = 'Projects List';

  constructor(searchProjectData, searchProject, searchText) {
		this.searchProjectData = searchProjectData;
    this.searchProject = searchProject;
    this.repo = {};
	}

  getViewStrategy() {
        return '../common/project-details.html';
    }
	activate(params, routeConfig, navigationInstruction) {
    return this.searchProjectData.findById(params.id).then(repo => {
			this.repo = repo;
      return this.repo;
		});

	}

}
