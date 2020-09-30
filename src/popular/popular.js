import { inject } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { DataContext } from 'services/datacontext';
import { StageConfig } from '../stageConf';
import { FakeData } from '../fakeData';
import { EA_MS_FEATURED_DATA, ES_MSG_CATEGORIES_DATA, ES_MSG_ENGAGEMENTPOPUP_DATA } from '../constants/ch-constants';

@inject(DataContext, Router, StageConfig, FakeData, EventAggregator)
export class Popular {

  constructor(dataContext, router, stageConfig, fakeData, eventAggregator) {
    this.dataContext = dataContext;
    this.router = router;
    this.stageConfig = stageConfig;
    this.fp = stageConfig.FEATURED_PROJECTS;
    this.fakeData = fakeData;
    this.eventAggregator = eventAggregator;

    this.projects = [];
    this.featured = [];
    this.healthiest = [];
    this.categories = [];
    this.engagementPopups = [];

    this.projectTitle = 'Most Popular Projects';

    this.landing = true;
    this.searchingPopular = false;
    this.searchingFeatured = false;
    this.searchingHealthiest = false;

    this.sortDirection = 'descending';
    this.selectedSort = 'rank';
    this.sortOptions = [
      { value: 'rank', name: 'Rank' },
      { value: 'stars', name: 'Stars' },
      { value: 'watchers', name: 'Watchers' },
      { value: 'releases', name: 'Releases' },
      { value: 'commits', name: 'Commits' },
      { value: 'contributors', name: 'Contributors' },
    ];
    this.openReadmeLinkId = null;
    this.exitDialogLinkId = null;
  }

  getData() {
    this.searchingFeatured = true;
    this.dataContext.findFeatured().then((results) => {
      if(!results) {
        this.searchingFeatured = false;
        return this.featured;
      }
      let b = 4;
      if (results.length < b) {
        b = results.length - 1;
        b = b < 0 ? 0 : b;
      }
      if (this.fakeData) {
        if (results.length>0) {
          results.splice(b, 0, this.fakeData);
        } else {
          results.push(this.fakeData);
        }
      }
      this.featured = results;
      this.searchingFeatured = false;
      this.eventAggregator.publish(EA_MS_FEATURED_DATA, this.featured);
    });

    this.dataContext.getCategories().then((response) => {
      if (!response) {
        return;
      }
      this.categories = response;
      this.eventAggregator.publish(ES_MSG_CATEGORIES_DATA, this.categories);
    });

    this.dataContext.getEngagementPopups().then((response) => {
      if (!response) {
        return;
      }
      this.engagementPopups = response;
      this.eventAggregator.publish(ES_MSG_ENGAGEMENTPOPUP_DATA, this.engagementPopups);
    });
  }

  activate() {
    this.getData();
  }
}
