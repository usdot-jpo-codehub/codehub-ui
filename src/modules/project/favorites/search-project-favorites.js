import {inject} from "aurelia-framework";
import {SearchProjectData} from "./searchProjectData";
import {Router} from "aurelia-router";

@inject(SearchProjectData, Router)
export class SearchProjectFavorites {

  constructor(searchProjectData, router) {
  		this.searchProjectData = searchProjectData;
      this.router = router;
  	}

  	activate(params, router, navigationInstruction) {
      this.projects = [];
  		this.router = navigationInstruction.router;
  		return this.searchProjectData.searchFavoritesByName(searchText)
      .then( projects => {
  			this.projects = projects;
  		});
  	}

  	executeSearch(searchText) {
  		this.router.navigateToRoute("result-favorites",{searchText:searchText});
  	}

  }
