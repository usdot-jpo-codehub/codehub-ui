import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import $ from 'jquery';
import 'bootstrap-multiselect';
import { DataContext } from 'services/datacontext';
import { Filters } from 'components/filters';

@inject(DataContext, Router, Filters)
export class Explore {

  constructor(dataContext, router, filters) {
    this.dataContext = dataContext;
    this.router = router;
    this.filters = filters;
    this.params = null;

    this.resultCount = 0;
    this.searchDone = false;

    this.projects = [];
    this.categories = [];

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

  activate(params) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.params = params;
    this.searchDone = false;
    this.getData();
  }

  getData() {
    return Promise.all([
      this.dataContext.getRepositories(null),
      this.dataContext.getCategories()])
      .then(response => {
        let projects = response[0];
        let categories = response[1];
        if (!projects) {
          this.searchDone = true;
          return this.projects;
        }

        setTimeout(() => {
          this.projects = JSON.parse(JSON.stringify(projects));
          this.categories = categories;
          this.filters.selectedCategories = this.categories.map(x => x.id+'|'+x.name);
          this.filters.selectedOrganizations = this.filters.getUniqueValues(this.projects, 'sourceData.owner.name');
          this.filters.selectedLanguages = this.filters.getUniqueValues(this.projects, 'sourceData.language');
          this.rebuildFilterCategories(projects);
          this.rebuildFilterOrg(projects);
          this.rebuildFilterLang(projects);
          this.searchDone = true;
          this.resultCount = this.projects.length;

          this.manageParams();
          return this.projects;
        }, 10);
      });
  }

  attached() {
    this.setupFilterCategories();
    this.setupFilterOrg();
    this.setupFilterLang();

    this.rebuildFilterCategories(this.projects);
    this.rebuildFilterOrg(this.projects);
    this.rebuildFilterLang(this.projects);
  }

  rebuildFilterCategories(projects) {
    const options = [];
    for (const category of this.categories) {
      let count = this.filters.countProjectsInCategory(projects, category.id);
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

  setupFilterCategories() {
    $('#filterCategories').multiselect({
      includeSelectAllOption: true,
      enableFiltering: true,
      disableIfEmpty: true,
      enableCaseInsensitiveFiltering: true,
      maxHeight: 250,
      enableHTML: true,
      position: 'relative',
      buttonText(options, select) {
        if (options.length === 0) {
          return 'Categories';
        } else if (options.length === options.prevObject.length) {
          return `Categories (${options.length})`;
        }
        return `Categories (${options.length}) `;
      },
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

      let filterArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'sourceData.language');
      filterArr = this.filterArray(filterArr, this.filters.selectedOrganizations, 'sourceData.owner.name');
      this.resultCount = this.filterArrayCategories(filterArr, this.filters.selectedCategories).length;
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

      let filterArr = this.filterArray(this.projects, this.filters.selectedLanguages, 'sourceData.language');
      filterArr = this.filterArray(filterArr, this.filters.selectedOrganizations, 'sourceData.owner.name');
      this.resultCount = this.filterArrayCategories(filterArr, this.filters.selectedCategories).length;
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

  manageParams() {
    if (!this.params) {
      return;
    }

    if(this.params.category) {
      this.filters.selectedCategories = [this.params.category];
      $('#filterCategories').multiselect('select', [this.params.category]);
      $('#filterCategories').trigger('change');
    }
  }
}
