import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { typeahead } from 'corejs-typeahead';
import { SearchProjectData } from '../dataRepository/searchProjectData';


@inject(SearchProjectData, Router)
export class SearchProject {

  constructor(searchProjectData, router) {
    this.searchProjectData = searchProjectData;
    this.router = router;
  }

  executeSearch(searchText) {
    this.router.navigateToRoute('result', { searchText });
  }

  attached() {
    const search = this.searchProjectData;

    const suggestions = function (query, syncResults, asyncResults) {
      search.findSuggestion(query).then(data => {
        const matches = [];
        console.log(Object.keys(data));
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

    $('#searchBox .typeahead').bind('typeahead:select', function (ev, suggestion) {
      this.executeSearch(suggestion);
    }.bind(this));
  }

}
