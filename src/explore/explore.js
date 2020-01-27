import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import $ from 'jquery';
import 'bootstrap-multiselect';
import { DialogService } from 'aurelia-dialog';
import { DataContext } from 'services/datacontext';
import { Filters } from 'components/filters';
import { ReadmeModal } from '../components/modals/readme-modal';
import { LeavingModal } from '../components/modals/leaving-modal';
import { VScanModal } from '../components/modals/vscan-modal';

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
      { value: 'generatedData.rank', name: 'Rank' },
      { value: 'sourceData.stars', name: 'Stars' },
      { value: 'sourceData.watchers', name: 'Watchers' },
      { value: 'sourceData.releases', name: 'Releases' },
      { value: 'sourceData.commits', name: 'Commits' },
      { value: 'sourceData.contributors', name: 'Contributors' },
      { value: 'sourceData.forks', name: 'Forks' }
    ];
    this.openReadmeLinkId = null;
    this.exitDialogLinkId = null;
  }

  getData() {
    return this.dataContext.getRepositories(null)
      .then(projects => {
        if (!projects) {
          this.searchDone = true;
          return this.projects;
        }

        setTimeout(() => {
          this.projects = JSON.parse(JSON.stringify(projects));
          this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'sourceData.owner.name');
          this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'sourceData.language');
          this.rebuildFilterOrg(projects);
          this.rebuildFilterLang(projects);
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

    this.rebuildFilterOrg(this.projects);
    this.rebuildFilterLang(this.projects);
  }

  rebuildFilterOrg(projects) {
    const options = [];
    const unique = this.getUniqueValues(projects, 'sourceData.owner.name');
    for (const org of unique) {
      options.push({ label: `${org} <small>(${this.countUniqueValues(projects, 'sourceData.owner.name', org)})</small>`, title: org, value: org, selected: false });
    }
    $('#filterOrg').multiselect('dataprovider', options);
    $('#filterOrg').trigger('change');
  }

  rebuildFilterLang(projects) {
    const options = [];
    const unique = this.getUniqueValues(projects, 'sourceData.language');
    for (const lang of unique) {
      options.push({ label: `${lang} <small>(${this.countUniqueValues(projects, 'sourceData.language', lang)})</small>`, title: lang, value: lang, selected: false });
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
        this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'sourceData.owner.name');
        this.filterOrgEmpty = true;
      }

      let fitlerArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'sourceData.language');
      this.resultCount = this.filterArray(fitlerArr, this.filters.selectedOrganizations, 'sourceData.owner.name').length;
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
        this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'sourceData.language');
        this.filterLangEmpty = true;
      }

      let fitlerArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'sourceData.language');
      this.resultCount = this.filterArray(fitlerArr, this.filters.selectedOrganizations, 'sourceData.owner.name').length;
    });
  }

  clearAllFilters() {
    $('#filterLang').multiselect('deselectAll', false);
    $('#filterOrg').multiselect('deselectAll', false);

    $('#filterLang').trigger('change');
    $('#filterOrg').trigger('change');

    this.rebuildFilterOrg(this.projects);
    this.rebuildFilterLang(this.projects);
  }

  removePill(ms, value) {
    $(ms).multiselect('deselect', value);
    $(ms).trigger('change');
  }

  getUniqueValues(array, property) {
    const propertyArray = [];
    for (const object of array) {
      let v = this.filters.getNested(object, property);
      if (v) {
        propertyArray.push(v);
      } else {
        propertyArray.push('None');
      }
    }
    return Array.from(new Set(propertyArray));
  }

  // Counts number of results with a value for a certain property
  // (e.g. number of results with 'java' as a 'language' would be countUniqueValues(results, 'language', 'java')
  countUniqueValues(array, property, value) {
    let count = 0;
    for (const object of array) {
      let v = this.filters.getNested(object, property);
      if (v) {
        if (v === value) {
          count++;
        } else if ((v === null || v === undefined) && value === 'None') {
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
          let v = this.filters.getNested(object, propertyName);
          if (v) {
            if (v === value) {
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

  openLeavingSiteConfirmation(name, url, target, bypass) {
    this.exitDialogLinkId = target.getAttribute('id');
    let byp = bypass === undefined ? false : bypass;
    if(byp) {
      const win = window.open(url, '_blank');
      win.focus();
    } else {
      const mdl = { name, url };
      this.dialogService.open({ viewModel: LeavingModal, model: mdl, lock: false }).whenClosed( response => {
        const element = document.querySelector('#'+this.exitDialogLinkId);
        if(element) {
          element.focus();
        }
      });
    }
  }

  displayVScanDialog(repo, target) {
    this.exitDialogLinkId = target.getAttribute('id');
    this.dialogService.open({viewModel: VScanModal, model: repo, lock: false}).whenClosed( reponse => {
      const element = document.querySelector('#'+this.exitDialogLinkId);
      if(element) {
        element.focus();
      }
    });
  }
}
