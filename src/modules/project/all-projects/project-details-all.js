import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {SearchProjectData} from "./searchProjectData";
//import {SearchProject} from "./search-project";
import {bindable} from 'aurelia-framework';

@inject(SearchProjectData, Router)
export class ProjectDetailsAll {
  heading = 'Projects List';

  constructor(searchProjectData, searchProject, searchText) {
		this.searchProjectData = searchProjectData;
    this.searchProject = searchProject;
	}

	activate(params, routeConfig, navigationInstruction) {
    return this.searchProjectData.searchAllByName(params.searchText).then(projects=> {
			this.projects = projects;
		});

	}

}
