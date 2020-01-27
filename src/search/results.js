import { inject } from 'aurelia-framework';
import { activationStrategy } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DialogService } from 'aurelia-dialog';
import $ from 'jquery';
import { DataContext } from 'services/datacontext';
import { Filters } from 'components/filters';
import { ReadmeModal } from '../components/modals/readme-modal';
import { LeavingModal } from '../components/modals/leaving-modal';
import { StageConfig } from '../../stageConf';
import { VScanModal } from '../components/modals/vscan-modal';

@inject(DataContext, Filters, EventAggregator, DialogService, StageConfig)
export class Results {

  constructor(dataContext, filters, ea, dialogService, stageConfig) {
    this.dataContext = dataContext;
    this.filters = filters;
    this.ea = ea;
    this.dialogService = dialogService;
    this.stageConfig = stageConfig;

    this.searchText = '';
    this.resultCount = 0;
    this.searchDone = false;

    this.projects = [];

    this.filterLangEmpty = true;
    this.filterOrgEmpty = true;

    this.sortDirection = 'descending';

    this.selectedSort = 'default';
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
    this.ariaLabel = '';
    this.exitDialogLinkId = null;
  }

  determineActivationStrategy() {
    return activationStrategy.replace; // Must be replace due to virtualization
  }

  activate(params) {
    this.projects = [];
    this.searchDone = false;

    this.resultCount = 0;
    this.searchText = params.searchText;
    

    return this.dataContext.search(params.searchText)
      .then(projects => {
          this.projects = projects;
          this.resultCount = this.projects.length;
          this.searchDone = true;
          this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'sourceData.owner.name');
          this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'sourceData.language');
          this.rebuildFilterOrg(projects);
          this.rebuildFilterLang(projects);
          this.ariaLabel = this.getResultsAriaLabel(this.resultCount, this.searchText);
          let searchResult = {text: params.searchText, count: this.resultCount};
          this.ea.publish('searchExecuted', searchResult);
          const resultsText = document.querySelector('#results-result-text');
          if(resultsText)
            resultsText.focus();
          return this.projects;
      });
  }

  getResultsAriaLabel(resultCount, searchText) {
    return `${resultCount} results for search text: ${searchText}`
  }

  rebuildFilterOrg(projects) {
    const options = [];
    const unique = this.getUniqueValues(projects, 'sourceData.owner.name');
    for (const org of unique) {
      options.push({ label: `${org} <small>(${this.countUniqueValues(projects, 'sourceData.owner.name', org)})</small>`, title: org, value: org, selected: false});
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
      nonSelectedText: '',
      buttonContainer: '<div class="btn-group" id="filterOrg-button" />',
      buttonText(options, select) {
        if (options.length === 0) {
          return 'Organizations';
        } else if (options.length === options.prevObject.length) {
          return `Organizations (${options.length})`;
        }
        return `Organizations (${options.length}) `;
      },
      buttonTitle(options, select) {
        if (options.length === 0) {
          return 'Filter Organizations';
        } else if (options.length === options.prevObject.length) {
          return `Filter Organizations (${options.length})`;
        }
        return `Filter Organizations (${options.length}) `;
      }
    });

    $('#filterOrg').on('change', ev => {
      if ($('#filterOrg').val()) {
        this.filters.selectedOrganizations = $('#filterOrg').val();
        this.filterOrgEmpty = false;
      } else {
        this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'sourceData.owner.name');
        this.filterOrgEmpty = true;
      }

      const fitlerArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'sourceData.language');
      this.resultCount = this.filterArray(fitlerArr, this.filters.selectedOrganizations, 'sourceData.owner.name').length;
      this.ariaLabel = this.getResultsAriaLabel(this.resultCount, this.searchText);
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
      buttonContainer: '<div class="btn-group" id="filterLang-button" />',
      buttonText(options, select) {
        if (options.length === 0) {
          return 'Languages';
        } else if (options.length === options.prevObject.length) {
          return `Languages (${options.length})`;
        }
        return `Languages (${options.length})`;
      },
      buttonTitle(options, select) {
        if (options.length === 0) {
          return 'Filter Languages';
        } else if (options.length === options.prevObject.length) {
          return `Filter Languages (${options.length})`;
        }
        return `Filter Languages (${options.length}) `;
      }
    });

    $('#filterLang').on('change', ev => {
      if ($('#filterLang').val()) {
        this.filters.selectedLanguages = $('#filterLang').val();
        this.filterLangEmpty = false;
      } else {
        this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'sourceData.language');
        this.filterLangEmpty = true;
      }

      const fitlerArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'sourceData.language');
      this.resultCount = this.filterArray(fitlerArr, this.filters.selectedOrganizations, 'sourceData.owner.name').length;
      this.ariaLabel = this.getResultsAriaLabel(this.resultCount, this.searchText);
    });
  }

  clearAllFilters() {
    $('#filterLang').multiselect('deselectAll', false);
    $('#filterOrg').multiselect('deselectAll', false);

    $('#filterLang').trigger('change');
    $('#filterOrg').trigger('change');

    this.rebuildFilterOrg(this.projects);
    this.rebuildFilterLang(this.projects);

    const resultsMainPanel = document.querySelector('#results-result-text');
    if(resultsMainPanel) {
      resultsMainPanel.focus();
    }
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
      if (v === value) {
        count++;
      } else if ((v === null || v === undefined) && value === 'None') {
        count++;
      }
    }
    return count;
  }

  filterArray(array, filterArray, propertyName) {
    if (filterArray.length === 0)
      return array;

    let result = array
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
        if(element) {
          element.focus();
        }
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

  removePillFilter(multiselectId, pill) {
    $(multiselectId).multiselect('deselect', pill);
    $(multiselectId).trigger('change');

    if(this.filters.selectedOrganizations.length > 0 || this.filters.selectedLanguages.length>0 ) {
      const clearAllFilterElement = document.querySelector('#result-clearall-filters');
      if(clearAllFilterElement) {
        clearAllFilterElement.focus();
      }
    } else { //in case the last pill was removed then select the main panel.
      const resultsMainPanel = document.querySelector('#results-result-text');
      if(resultsMainPanel) {
        resultsMainPanel.focus();
      }
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
