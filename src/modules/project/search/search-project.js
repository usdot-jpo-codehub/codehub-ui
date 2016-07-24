import {inject} from "aurelia-framework";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {Router} from "aurelia-router";

@inject(SearchProjectData, Router)
export class SearchProject {

  constructor(searchProjectData, router) {
  		this.searchProjectData = searchProjectData;
      this.router = router;

  	}
  	executeSearch(searchText) {
        this.router.navigateToRoute("result",{searchText:searchText});
      }

  }
