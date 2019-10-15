import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';
// import 'typeahead';
import { DataContext } from 'services/datacontext';
import { StageConfig } from '../../stageConf';

@inject(DataContext, Router, EventAggregator, StageConfig)
export class SearchBar {

  constructor(dataContext, router, eventAggregator, stageConfig) {
    this.dataContext = dataContext;
    this.router = router;
    this.eventAggregator = eventAggregator;
    this.stageConfig = stageConfig;

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
    // $('#searchBox .typeahead').typeahead('close');
  }

  activate() {
    if (this.router.currentInstruction) {
      this.landing = this.router.currentInstruction.fragment === '/';
    } else {
      this.landing = false;
    }
  }

}
