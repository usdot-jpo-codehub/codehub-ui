import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {bindable} from 'aurelia-framework';

@inject(SearchProjectData, Router)
export class ProjectDetailsPopular {

  constructor(searchProjectData, searchProject, searchText) {
		this.searchProjectData = searchProjectData;
    this.searchProject = searchProject;
    this.repo = {};
    this.relevant_results = {};
	}

  getViewStrategy() {
        return '../common/project-details.html';
    }
	activate(params, routeConfig, navigationInstruction) {

    this.searchProjectData.findByRelevance("javascript").then(relevant_results => {
      this.relevant_results = relevant_results;
    });

    this.searchProjectData.findById(params.id).then(repo => {
			this.repo = repo;
		});



	}

}
