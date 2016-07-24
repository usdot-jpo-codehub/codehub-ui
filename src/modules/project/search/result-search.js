import {inject} from "aurelia-framework";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {Router} from "aurelia-router";

@inject(SearchProjectData, Router)
export class ResultSearch {

  constructor(searchProjectData, router) {
  		this.searchProjectData = searchProjectData;
      this.router = router;
  	}
    executeSearch(searchText) {
      this.router.navigateToRoute("result-ret",{searchText:searchText, searchData:this.searchProjectData.getAll("api")});
    }

  }
