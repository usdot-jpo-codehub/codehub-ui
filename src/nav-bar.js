import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';
import { typeahead } from 'corejs-typeahead';
import { DataContext } from 'services/datacontext';

@inject(DataContext, Router, EventAggregator)
export class NavBar {

  constructor(dataContext, router, eventAggregator) {
    this.dataContext = dataContext;
    this.router = router;
    this.eventAggregator = eventAggregator;

    this.navSearchText = '';
  }

  executeNavSearch(searchText) {
    this.eventAggregator.publish('searchExecuted', searchText);

    this.router.navigateToRoute('results', { searchText });
    $('#navSearchBox .typeahead').typeahead('close');
    this.hideNavSearch();
  }

  hideNavSearch() {
    $('#searchBtn').removeClass('hidden');
    $('#titleBarNav').removeClass('hidden');
    $('#searchForm').addClass('hidden');
    $('#searchBtn').parent().removeClass('hidden');
  }

  attached() {
    $('#searchBtn').on('click', event => {
      $('#searchBtn').parent().addClass('hidden');
      $('#titleBarNav').addClass('hidden');
      $('#searchForm').removeClass('hidden');
      $('#searchForm input').focus();
      this.navSearchText = '';
      $('#navSearchBox .typeahead').typeahead('val', '');
    });

    $('#searchForm input').focusout(event => {
      this.hideNavSearch();
    });

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

    $('#navSearchBox .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
      limit: 1000,
    },
      {
        name: 'suggestions',
        source: suggestions,
      });

    $('#navSearchBox .typeahead').bind('typeahead:select', (ev, suggestion) => {
      this.executeNavSearch(suggestion);
    });

    $('#navSearchBox .typeahead').bind('typeahead:autocompleted', (ev, suggestion) => {
      this.navSearchText = suggestion;
    });
  }

}
