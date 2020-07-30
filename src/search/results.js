import { inject } from 'aurelia-framework';
import { activationStrategy } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';
import { DataContext } from 'services/datacontext';
import { Filters } from 'components/filters';
import StageConfig from '../../stageConf';

@inject(DataContext, Filters, EventAggregator, StageConfig)
export class Results {

  constructor(dataContext, filters, ea, stageConfig) {
    this.dataContext = dataContext;
    this.filters = filters;
    this.ea = ea;
    this.stageConfig = stageConfig;

    this.searchText = '';
    this.resultCount = 0;
    this.searchDone = false;

    this.projects = [];
    this.categories = [];

    this.filterLangEmpty = true;
    this.filterOrgEmpty = true;
    this.filterCategoriesEmpty = true;

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
    this.categories = [];
    this.searchDone = false;

    this.resultCount = 0;
    this.searchText = params.searchText;
    

    return Promise.all([this.dataContext.search(params.searchText), this.dataContext.getCategories()])
      .then(response => {
          this.projects = response[0] ? response[0] : [];
          this.categories = response[1] ? response[1] : [];
          this.resultCount = this.projects.length;
          this.searchDone = true;
          this.filters.selectedCategories = this.categories.map(x => x.id+'|'+x.name);
          this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'sourceData.owner.name');
          this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'sourceData.language');
          this.rebuildFilterCategories(this.projects);
          this.rebuildFilterOrg(this.projects);
          this.rebuildFilterLang(this.projects);
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

  rebuildFilterCategories(projects) {
    const options = [];
    for (const category of this.categories) {
      let count = this.filters.countProjectsInCategory(projects, category.id);
      if (count == 0) {
        continue;
      }

      let op = {
        label: `${category.name} <small>(${count})</small>`,
        title: category.name,
        value: `${category.id}|${category.name}`,
        selected: false
       }
       options.push(op);
    }
    $('#filterCategories').multiselect('dataprovider', options);
    $('#filterCategories').trigger('change');
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

  setupFilterCategories() {
    $('#filterCategories').multiselect({
      includeSelectAllOption: true,
      enableFiltering: true,
      disableIfEmpty: true,
      enableCaseInsensitiveFiltering: true,
      maxHeight: 250,
      enableHTML: true,
      nonSelectedText: '',
      buttonContainer: '<div class="btn-group" id="filterCategories-button" />',
      buttonText(options, select) {
        if (options.length === 0) {
          return 'Categories';
        } else if (options.length === options.prevObject.length) {
          return `Categories (${options.length})`;
        }
        return `Categories (${options.length}) `;
      },
      buttonTitle(options, select) {
        if (options.length === 0) {
          return 'Filter Categories';
        } else if (options.length === options.prevObject.length) {
          return `Filter Categories (${options.length})`;
        }
        return `Filter Categories (${options.length}) `;
      }
    });

    $('#filterCategories').on('change', ev => {
      if ($('#filterCategories').val()) {
        this.filters.selectedCategories =  $('#filterCategories').val();
        this.filterCategoriesEmpty = false;
      } else {
        this.filters.selectedCategories = this.categories.map(x => x.id+'|'+x.name);
        this.filterCategoriesEmpty = true;
      }

      let filterArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'sourceData.language');
      filterArr = this.filterArray(filterArr, this.filters.selectedOrganizations, 'sourceData.owner.name');
      this.resultCount = this.filterArrayCategories(filterArr, this.filters.selectedCategories).length;

      this.ariaLabel = this.getResultsAriaLabel(this.resultCount, this.searchText);
    });
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

      let filterArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'sourceData.language');
      filterArr = this.filterArray(filterArr, this.filters.selectedOrganizations, 'sourceData.owner.name');
      this.resultCount = this.filterArrayCategories(filterArr, this.filters.selectedCategories).length;

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

      let filterArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'sourceData.language');
      filterArr = this.filterArray(filterArr, this.filters.selectedOrganizations, 'sourceData.owner.name');
      this.resultCount = this.filterArrayCategories(filterArr, this.filters.selectedCategories).length;
      this.ariaLabel = this.getResultsAriaLabel(this.resultCount, this.searchText);
    });
  }

  clearAllFilters() {
    $('#filterLang').multiselect('deselectAll', false);
    $('#filterOrg').multiselect('deselectAll', false);
    $('#filterCategories').multiselect('deselectAll', false);

    $('#filterLang').trigger('change');
    $('#filterOrg').trigger('change');
    $('#filterCategories').trigger('change');

    this.rebuildFilterCategories(this.projects);
    this.rebuildFilterOrg(this.projects);
    this.rebuildFilterLang(this.projects);

    const resultsMainPanel = document.querySelector('#results-result-text');
    if(resultsMainPanel) {
      resultsMainPanel.focus();
    }
  }

  attached() {
    this.setupFilterCategories();
    this.setupFilterOrg();
    this.setupFilterLang();

    this.rebuildFilterCategories(this.projects);
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
      if (v) {
        if (v === value) {
          count++;
        }
      } else if(value == 'None') {
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

  filterArrayCategories(array, selectedCategories) {
    if (selectedCategories.length === 0) {
      return array;
    }

    let result = array.slice(0).filter( (project) => {
      for(const category of selectedCategories) {
        const categoryId = this.getDataFromPipedString(category,0);
        if (project.codehubData.categories && project.codehubData.categories.length > 0 && project.codehubData.categories.includes(categoryId)) {
          return true;
        }
      }
      return false;
    });
    return result;
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

  getDataFromPipedString(data, index) {
    if (!data || data == '' || !data.includes('|')) {
      return null;
    }
    let parts = data.split('|');
    if (index >= parts.length) {
      return null;
    }

    return parts[index];
  }
}
