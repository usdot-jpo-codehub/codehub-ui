import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {SearchProjectData} from "../dataRepository/searchProjectData";
//import {SearchProject} from "./search-project";
import {bindable} from 'aurelia-framework';

@inject(SearchProjectData, Router)
export class ProjectDetailsFavorites {
  heading = 'Projects List';

  getViewStrategy() {
        return '../common/project-details.html';
    }
  constructor(searchProjectData, searchProject, searchText) {
		this.searchProjectData = searchProjectData;
    this.searchProject = searchProject;
	}

	activate(params, routeConfig, navigationInstruction) {
    return this.searchProjectData.searchFavoritesByName(params.searchText).then(projects=> {
			this.projects = projects;
		});

	}

}
