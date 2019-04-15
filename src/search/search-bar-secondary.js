import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';
// import { typeahead } from 'corejs-typeahead';
import { DataContext } from 'services/datacontext';

@inject(DataContext, Router, EventAggregator)
export class SearchBarSecondary {

  constructor(dataContext, router, eventAggregator) {
    this.dataContext = dataContext;
    this.router = router;
    this.eventAggregator = eventAggregator;

    this.landing = true;

    this.searchText = '';

    // On nav bar search update search text
    this.subscriber = this.eventAggregator.subscribe('searchExecuted', searchText => {
      this.searchText = searchText;
    });

    // When leaving the results page reset search text
    this.subscriber = this.eventAggregator.subscribe('detachResults', searchText => {
      this.searchText = '';
    });
  }

  executeSearch(searchText) {
    this.router.navigateToRoute('results', { searchText });
    // $('#searchBox .typeahead').typeahead('close');
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
            const array = data[obj].source;
            let lastWord;
            const matchObj = {};

            if (array.length > 1) {
              lastWord = ` and${array.pop()}`;
              if (array.length > 1) {
                lastWord = `,${lastWord}`;
              }
            } else {
              lastWord = '';
            }
            const found = array.join(',') + lastWord;

            matchObj.text = data[obj].text;
            matchObj.found = found;

            matches.push(matchObj);
          }
        }
        asyncResults(matches);
      });
    };

    // $('#searchBox .typeahead').typeahead({
    //   hint: true,
    //   minLength: 1,
    //   limit: 1000,
    // },
    //   {
    //     name: 'suggestions',
    //     source: suggestions,
    //     display: 'text',
    //     templates: {
    //       empty() { return '<div class="tt-suggestion tt-selectable">No results found</div>'; },
    //       pending() { return '<div class="tt-suggestion tt-selectable">Loading...</div>'; },
    //       suggestion(data) {
    //         return `<div class="tt-suggestion tt-selectable"> ${data.text} <span class="tt-source"><strong>${data._query}</strong> found in project ${data.found}</span></div>`; // eslint-disable-line
    //       },
    //     },
    //   });

    // $('#searchBox .typeahead').bind('typeahead:select', (ev, suggestion) => {
    //   this.executeSearch(suggestion.text);
    // });

    // $('#searchBox .typeahead').bind('typeahead:autocompleted', (ev, suggestion) => {
    //   this.searchText = suggestion.text;
    // });
  }

}
