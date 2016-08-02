import {inject} from "aurelia-framework";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {Router} from "aurelia-router";
import $ from 'jquery';
import {autocomplete} from "jquery-ui";

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

    $("#searchBox").autocomplete({
      minLength: 3,
      source: function (request, response) {
        var term = request.term;

        search.findSuggestion(term).then(data => {
          response(data);
        });

      }
    }).data("uiAutocomplete")._renderItem = function (ul, item) {
      $(".autocomplete-block").addClass("active");
      return $("<li>")
        .data("item.autocomplete", item)
        .append("item.text")
        .appendTo("#autocomplete");
    };

    $("#searchBox").blur(function() {
      $(".autocomplete-block").removeClass("active");
    });

  }

}
