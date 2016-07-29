import {inject, bindable} from 'aurelia-framework';
import {Router, activationStrategy} from "aurelia-router";
import {SearchProjectData} from "../dataRepository/searchProjectData";

@inject(SearchProjectData, Router)
export class ProjectDetailsPopular {

  constructor(searchProjectData, searchProject, searchText) {
		this.searchProjectData = searchProjectData;
    this.searchProject = searchProject;
    this.repo = {};
    this.similarProjects= [];
	}

  getViewStrategy() {
        return '../common/project-details.html';
    }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

	activate(params, routeConfig, navigationInstruction) {

    document.body.scrollTop = document.documentElement.scrollTop = 0;

    this.searchProjectData.findSimilarProjects(params.id).then(similarProjects => {
      this.similarProjects = similarProjects;
    });

    this.searchProjectData.findById(params.id).then(repo => {
			this.repo = repo;
		});

	}

}
