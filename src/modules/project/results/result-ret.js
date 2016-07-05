import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {bindable} from 'aurelia-framework';

@inject(SearchProjectData, Router)
export class ResultRet {
  heading = 'Projects List';

  constructor(searchProjectData, searchProject, searchText) {
		this.searchProjectData = searchProjectData;
    this.searchProject = searchProject;
    this.projects = [];
    this.orgs = ["boozallen","booz-allen-hamilton","netflix"];
	}


  activate(params, routeConfig, navigationInstruction) {
    return this.searchProjectData.getAllProjects(this.orgs)
    .then( projects => {
      var projs = JSON.parse(JSON.stringify(projects));
      if(!(params.searchText) || params.searchText == ''){
        var projList = [];
        for(var projArr of projs){
          for(var proj of projArr){
            projList.push(proj);
          }
        }
        this.projects = projList;
        return this.projects;
      }
      else{
        var projList = [];
        var splitted_search_text = params.searchText.split(" ");
        if(splitted_search_text.length == 1){
          for(var projArr of projs){
            for(var proj of projArr){
            if(new RegExp(params.searchText,"i").test(proj.full_name) || new RegExp(params.searchText,"i").test(proj.description)){
              projList.push(proj);
            }

          }

        }
        }
        else{
            var parsedSearchText = this.getCombinationsOfSearchText(splitted_search_text);
            for(var searchWord of parsedSearchText){
              for(var projArr of projs){
                for(var proj of projArr){
                if(new RegExp(searchWord,"i").test(proj.full_name) || new RegExp(searchWord,"i").test(proj.description)){
                  projList.push(proj);
                }

              }

            }
            }

        }
      this.projects = projList;
      return this.projects;
      }
    });

	}

  getCombinationsOfSearchText(searchTextArray){
    var result = [];
    var ret = function(prefix, searchTextArray) {
      for (var i = 0; i < searchTextArray.length; i++) {
        result.push(prefix + searchTextArray[i]);
        ret(prefix + searchTextArray[i] +" ", searchTextArray.slice(i + 1));
      }
    }
    ret('', searchTextArray);
    return result;
  }

  }
