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
    this.ariaLabel = null;

    this.landing = true;

    this.searchText = '';

    // On nav bar search update search text
    this.subscriber = this.eventAggregator.subscribe('searchExecuted', searchResult => {
      this.searchText = searchResult.text;
      this.ariaLabel = `${searchResult.count} results for ${searchResult.text}`;
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

  triggerOnFocus() {
    this.generateAriaLabel();
  }

  generateAriaLabel() {
    const resultsText = document.querySelector('#results-result-text');
    if(resultsText) {
      const artx = resultsText.getAttribute('aria-label');
      if(artx){
        this.ariaLabel = artx;
      }
    }
  }

}
