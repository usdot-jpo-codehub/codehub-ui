import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import $ from 'jquery';
import { typeahead } from 'corejs-typeahead';
import { DataContext } from '../services/datacontext';

@inject(DataContext, Router)
export class SearchBar {

  constructor(dataContext, router) {
    this.dataContext = dataContext;
    this.router = router;

    this.landing = true;

    this.searchText = '';
  }

  executeSearch(searchText) {
    this.router.navigateToRoute('results', { searchText });
    $('#searchBox .typeahead').typeahead('close');
  }

  activate() {
    if (this.router.currentInstruction) {
      this.landing = this.router.currentInstruction.fragment === '/';
    } else {
      this.landing = false;
    }
  }

  attached() {
    const search = this.dataContext;

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

    $('#searchBox .typeahead').bind('typeahead:autocompleted', (ev, suggestion) => {
      this.searchText = suggestion;
    });
  }

}
