import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import $ from 'jquery';
import 'bootstrap-multiselect';
import { DialogService } from 'aurelia-dialog';
import { DataContext } from 'services/datacontext';
import { Filters } from 'components/filters';
import { ReadmeModal } from '../components/modals/readme-modal';
import { LeavingModal } from '../components/modals/leaving-modal';

@inject(DataContext, Router, Filters, DialogService)
export class Explore {

  constructor(dataContext, router, filters, dialogService) {
    this.dataContext = dataContext;
    this.router = router;
    this.filters = filters;
    this.dialogService = dialogService;

    this.resultCount = 0;
    this.searchDone = false;

    this.projects = [];

    this.projectTitle = 'Explore';

    this.sortDirection = 'descending';
    this.selectedSort = 'stars';
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
    return this.dataContext.getAll()
      .then(projects => {
        setTimeout(() => {
          this.projects = JSON.parse(JSON.stringify(projects));
          this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'organization');
          this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'language');
          this.filters.selectedOrigins = this.filters.getUniqueValues(this.projects, 'origin');
          this.rebuildFilterOrg(projects);
          this.rebuildFilterLang(projects);
          this.rebuildFilterOrigin(projects);
          this.searchDone = true;
          this.resultCount = this.projects.length;
          return this.projects;
        }, 10);
      });
  }

  activate() {
    this.searchDone = false;
    this.getData();
  }

  // TODO Filter work below here needs to be

  attached() {
    this.setupFilterOrg();
    this.setupFilterLang();
    this.setupFilterOrigin();

    this.rebuildFilterOrg(this.projects);
    this.rebuildFilterLang(this.projects);
    this.rebuildFilterOrigin(this.projects);
  }

  rebuildFilterOrg(projects) {
    const options = [];
    const unique = this.getUniqueValues(projects, 'organization');
    for (const org of unique) {
      options.push({ label: `${org} <small>(${this.countUniqueValues(projects, 'organization', org)})</small>`, title: org, value: org, selected: false });
    }
    $('#filterOrg').multiselect('dataprovider', options);
    $('#filterOrg').trigger('change');
  }

  rebuildFilterLang(projects) {
    const options = [];
    const unique = this.getUniqueValues(projects, 'language');
    for (const lang of unique) {
      options.push({ label: `${lang} <small>(${this.countUniqueValues(projects, 'language', lang)})</small>`, title: lang, value: lang, selected: false });
    }
    $('#filterLang').multiselect('dataprovider', options);
    $('#filterLang').trigger('change');
  }

  rebuildFilterOrigin(projects) {
    const options = [];
    const unique = this.getUniqueValues(projects, 'origin');
    for (const origin of unique) {
      options.push({ label: `${origin} <small>(${this.countUniqueValues(projects, 'origin', origin)})</small>`, title: origin, value: origin, selected: false });
    }
    $('#filterOrigin').multiselect('dataprovider', options);
    $('#filterOrigin').trigger('change');
  }

  setupFilterOrg() {
    $('#filterOrg').multiselect({
      includeSelectAllOption: true,
      enableFiltering: true,
      disableIfEmpty: true,
      enableCaseInsensitiveFiltering: true,
      maxHeight: 250,
      enableHTML: true,
      position: 'relative',
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

      let fitlerArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'language');
      fitlerArr = this.filterArray(fitlerArr, this.filters.selectedOrigins, 'origin');
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
      enableHTML: true,
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

      let fitlerArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'language');
      fitlerArr = this.filterArray(fitlerArr, this.filters.selectedOrigins, 'origin');
      this.resultCount = this.filterArray(fitlerArr, this.filters.selectedOrganizations, 'organization').length;
    });
  }

  setupFilterOrigin() {
    $('#filterOrigin').multiselect({
      enableFiltering: true,
      disableIfEmpty: true,
      enableCaseInsensitiveFiltering: true,
      maxHeight: 250,
      enableHTML: true,
      buttonText(options, select) {
        if (options.length === 0) {
          return 'Origin';
        } else if (options.length === options.prevObject.length) {
          return `Origin (${options.length})`;
        }
        return `Origin (${options.length})`;
      },
    });

    $('#filterOrigin').on('change', ev => {
      if ($('#filterOrigin').val()) {
        this.filters.selectedOrigins = $('#filterOrigin').val();
        this.filterOriginEmpty = false;
      } else {
        this.filters.selectedOrigins = this.filters.getUniqueValues(this.projects, 'origin');
        this.filterOriginEmpty = true;
      }

      let fitlerArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'language');
      fitlerArr = this.filterArray(fitlerArr, this.filters.selectedOrigins, 'origin');
      this.resultCount = this.filterArray(fitlerArr, this.filters.selectedOrganizations, 'organization').length;
    });
  }

  clearAllFilters() {
    $('#filterLang').multiselect('deselectAll', false);
    $('#filterOrg').multiselect('deselectAll', false);
    $('#filterOrigin').multiselect('deselectAll', false);

    $('#filterLang').trigger('change');
    $('#filterOrg').trigger('change');
    $('#filterOrigin').trigger('change');

    this.rebuildFilterOrg(this.projects);
    this.rebuildFilterLang(this.projects);
    this.rebuildFilterOrigin(this.projects);
  }

  removePill(ms, value) {
    $(ms).multiselect('deselect', value);
    $(ms).trigger('change');
  }

  getUniqueValues(array, property) {
    const propertyArray = [];
    for (const object of array) {
      if (object) {
        if (property in object) {
          propertyArray.push(object[property]);
        } else {
          propertyArray.push('None');
        }
      }
    }
    return Array.from(new Set(propertyArray));
  }

  // Counts number of results with a value for a certain property
  // (e.g. number of results with 'java' as a 'language' would be countUniqueValues(results, 'language', 'java')
  countUniqueValues(array, property, value) {
    let count = 0;
    for (const object of array) {
      if (object) {
        if (object[property] === value) {
          count++;
        } else if ((object[property] === null || object[property] === undefined) && value === 'None') {
          count++;
        }
      }
    }
    return count;
  }

  filterArray(array, filterArray, propertyName) {
    if (filterArray.length === 0)
      return array;

    let result =  array
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

    return result;
  }

  openReadmeModal(repo, target) {
    this.openReadmeLinkId = target.getAttribute('id');
    this.dialogService.open({ viewModel: ReadmeModal, model: repo, lock: false }).whenClosed(response => {
      if (response.wasCancelled) {
        const element = document.querySelector('#'+this.openReadmeLinkId);
        element.focus();
      }
    });
  }

  openLeavingSiteConfirmation(name, url, target) {
    this.exitDialogLinkId = target.getAttribute('id');
    const mdl = { name, url };
    this.dialogService.open({ viewModel: LeavingModal, model: mdl, lock: false }).whenClosed( response => {
      const element = document.querySelector('#'+this.exitDialogLinkId);
      if(element) {
        element.focus();
      }
    });
  }

}
