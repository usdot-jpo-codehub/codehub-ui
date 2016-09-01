import { inject, bindable } from 'aurelia-framework';
import { activationStrategy } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'bootstrap';
import { multiselect } from 'bootstrap-multiselect';
import { DataContext } from '../services/datacontext';
import { Filters } from '../components/filters';

@inject(DataContext, Filters, EventAggregator)
export class Results {

  constructor(dataContext, filters, ea) {
    this.dataContext = dataContext;
    this.filters = filters;
    this.ea = ea;

    this.searchText = '';
    this.resultCount = 0;

    this.projects = [];

    this.selectedOrganizations = [];
    this.selectedLanguages = [];

    this.filterLangEmpty = true;
    this.filterOrgEmpty = true;

    this.sortDirection = 'descending';

    this.selectedSort = 'default';
    this.sortOptions = [
      { value: 'rank', name: 'Rank' },
      { value: 'default', name: 'Relevance' },
      { value: 'stars', name: 'Stars' },
      { value: 'watchers', name: 'Watchers' },
      { value: 'releases', name: 'Releases' },
      { value: 'commits', name: 'Commits' },
      { value: 'contributors', name: 'Contributors' },
    ];
  }

  determineActivationStrategy() {
    return activationStrategy.invokeLifecycle;
  }

  activate(params) {
    if (!(params.searchText) || params.searchText === '') {
      this.searchText = 'Everything';
      return this.dataContext.getAll()
        .then(projects => {
          this.projects = projects;
          this.resultCount = this.projects.length;
          this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'organization');
          this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'language');
          this.rebuildFilterOrg(projects);
          this.rebuildFilterLang(projects);
          return this.projects;
        });
    }

    this.resultCount = 0;
    this.searchText = params.searchText;
    this.ea.publish('searchExecuted', params.searchText);

    return this.dataContext.search(params.searchText)
      .then(projects => {
        this.projects = projects;
        this.resultCount = this.projects.length;
        this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'organization');
        this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'language');
        this.rebuildFilterOrg(projects);
        this.rebuildFilterLang(projects);
        return this.projects;
      });
  }

  rebuildFilterOrg(projects) {
    const options = [];
    const unique = this.getUniqueValues(projects, 'organization');
    for (const org of unique) {
      options.push({ label: org, title: org, value: org, selected: false });
    }
    $('#filterOrg').multiselect('dataprovider', options);
    $('#filterOrg').trigger('change');
  }

  rebuildFilterLang(projects) {
    const options = [];
    const unique = this.getUniqueValues(projects, 'language');
    for (const lang of unique) {
      options.push({ label: lang, title: lang, value: lang, selected: false });
    }
    $('#filterLang').multiselect('dataprovider', options);
    $('#filterLang').trigger('change');
  }

  setupFilterOrg() {
    $('#filterOrg').multiselect({
      includeSelectAllOption: true,
      enableFiltering: true,
      disableIfEmpty: true,
      enableCaseInsensitiveFiltering: true,
      maxHeight: 250,
      buttonText(options, select) {
        if (options.length === 0) {
          return 'Organizations';
        } else if (options.length === options.prevObject.length) {
          return `Organizations (${options.length})`;
        }
        return `Organizations (${options.length}) `;
      },
    });

    $('#filterOrg').on('change', ev => {
      if ($('#filterOrg').val()) {
        this.filters.selectedOrganizations = $('#filterOrg').val();
        this.filterOrgEmpty = false;
      } else {
        this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'organization');
        this.filterOrgEmpty = true;
      }

      const fitlerArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'language');
      this.resultCount = this.filterArray(fitlerArr, this.filters.selectedOrganizations, 'organization').length;
    });
  }

  setupFilterLang() {
    $('#filterLang').multiselect({
      includeSelectAllOption: true,
      enableFiltering: true,
      disableIfEmpty: true,
      enableCaseInsensitiveFiltering: true,
      maxHeight: 250,
      buttonText(options, select) {
        if (options.length === 0) {
          return 'Languages';
        } else if (options.length === options.prevObject.length) {
          return `Languages (${options.length})`;
        }
        return `Languages (${options.length})`;
      },
    });

    $('#filterLang').on('change', ev => {
      if ($('#filterLang').val()) {
        this.filters.selectedLanguages = $('#filterLang').val();
        this.filterLangEmpty = false;
      } else {
        this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'language');
        this.filterLangEmpty = true;
      }

      const fitlerArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'language');
      this.resultCount = this.filterArray(fitlerArr, this.filters.selectedOrganizations, 'organization').length;
    });
  }

  attached() {
    this.setupFilterOrg();
    this.setupFilterLang();

    this.rebuildFilterOrg(this.projects);
    this.rebuildFilterLang(this.projects);
  }

  detached() {
    this.ea.publish('detachResults');
  }

  removePill(ms, value) {
    $(ms).multiselect('deselect', value);
    $(ms).trigger('change');
  }

  getUniqueValues(array, property) {
    const propertyArray = [];
    for (const object of array) {
      if (object[property]) {
        propertyArray.push(object[property]);
      } else {
        propertyArray.push('None');
      }
    }
    return Array.from(new Set(propertyArray));
  }

  filterArray(array, filterArray, propertyName) {
    return array
      .slice(0)
      .filter((object) => {
        for (const value of filterArray) {
          if (object[propertyName]) {
            if (object[propertyName] === value) {
              return true;
            }
          } else if (value === 'None') {
            return true;
          }
        }
        return false;
      });
  }

}
