import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';
import { typeahead } from 'corejs-typeahead';
import { DataContext } from '../services/datacontext';

@inject(DataContext, Router, EventAggregator)
export class SearchBar {

  constructor(dataContext, router, eventAggregator) {
    this.dataContext = dataContext;
    this.router = router;
    this.eventAggregator = eventAggregator;

    this.landing = true;

    this.searchText = '';

    // On nav bar search update search text
    this.subscriber = this.eventAggregator.subscribe('navSearch', searchText => {
      this.searchText = searchText;
    });

    // When leaving the results page reset search text
    this.subscriber = this.eventAggregator.subscribe('detachResults', searchText => {
      this.searchText = '';
    });
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
      search.findSuggestions(query).then(data => {
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
