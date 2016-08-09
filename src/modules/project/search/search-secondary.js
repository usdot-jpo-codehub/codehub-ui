import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import $ from 'jquery';
import { typeahead } from 'corejs-typeahead';
import { SearchProjectData } from '../dataRepository/searchProjectData';


@inject(SearchProjectData, Router)
export class SearchSecondary {

  constructor(searchProjectData, router) {
    this.searchProjectData = searchProjectData;
    this.router = router;
  }

  executeSearch(searchText) {
    this.router.navigateToRoute('result', { searchText });
  }

  attached() {
    const search = this.searchProjectData;

    const suggestions = (query, syncResults, asyncResults) => {
      search.findSuggestion(query).then(data => {
        const matches = [];
        for (const obj in data) {
          if ({}.hasOwnProperty.call(data, obj)) {
            matches.push(data[obj].text);
          }
        }
        asyncResults(matches);
      });
    };

    $('#searchBox .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
      limit: 1000,
    },
      {
        name: 'suggestions',
        source: suggestions,
      });

    $('#searchBox .typeahead').bind('typeahead:select', (ev, suggestion) => {
      this.executeSearch(suggestion);
    });
  }

}
