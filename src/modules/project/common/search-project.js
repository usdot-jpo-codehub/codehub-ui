import {inject} from "aurelia-framework";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {Router} from "aurelia-router";

@inject(SearchProjectData, Router)
export class SearchProject {

  // getViewStrategy() {
  //       return '../common/search-project.html';
  //   }
  constructor(searchProjectData, router) {
  		this.searchProjectData = searchProjectData;
      this.router = router;
  	}

  	activate(params, router, navigationInstruction) {
      this.projects = [];
  		this.router = navigationInstruction.router;
  		return this.searchProjectData.searchByName(searchText)
      .then( projects => {
  			this.projects = projects;
  		});
  	}

  	executeSearch(searchText) {
  		this.router.navigateToRoute("result",{searchText:searchText});
  	}

  }
