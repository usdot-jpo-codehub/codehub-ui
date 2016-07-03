import {inject} from "aurelia-framework";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {Router} from "aurelia-router";

@inject(SearchProjectData, Router)
export class ResultSearch {

  // getViewStrategy() {
  //       return '../common/search-project.html';
  //   }

  constructor(searchProjectData, router) {
  		this.searchProjectData = searchProjectData;
      this.router = router;
  	}

    bind(projects){
      //  this.projects = [{name:"wow",description:"nope"},{name:"wow",description:"nope"}];
      //  alert("I'm coming to ");
    }

  	activate(params, router, navigationInstruction) {
        //this.projects = [{name:"wow",description:"nope"},{name:"wow",description:"nope"}];
  		//this.router = navigationInstruction.router;

  	}

    executeSearch2(searchText) {
      this.router.navigateToRoute("result-ret",{searchText:searchText},{settings: "result-ret"});
    }

  }
