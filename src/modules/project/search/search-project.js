import {inject} from "aurelia-framework";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {Router} from "aurelia-router";
import $ from 'jquery';
import {autocomplete} from "jquery-ui";

import {typeahead, Bloodhound} from "corejs-typeahead";


@inject(SearchProjectData, Router)
export class SearchProject {

  constructor(searchProjectData, router) {
    this.searchProjectData = searchProjectData;
    this.router = router;

  }

  executeSearch(searchText) {
    this.router.navigateToRoute("result", {searchText: searchText});
  }

  attached() {

    var search = this.searchProjectData;

    var suggestions = function (query, syncResults, asyncResults) {

      search.findSuggestion(query).then(data => {
        var matches = [];
        for (var obj in data) {
          matches.push(data[obj].text);
        }
        asyncResults(matches);

      });

    };

    $('#searchBox .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1,
        limit: 1000
      },
      {
        name: 'suggestions',
        source: suggestions
      });

  }

}
