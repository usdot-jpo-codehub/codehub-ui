import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { DialogService } from 'aurelia-dialog';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DataContext } from '../../src/services/datacontext';
import { Filters } from '../../src/components/filters';
import { Results } from '../../src/search/results';
import { StageConfig } from '../../src/stageConf';
import $ from 'jquery';
import { multiselect } from 'bootstrap-multiselect';

// Mocking DataContext (service)

export class MockDataContext {
  responseGetAll = undefined;
  responseSearch = undefined;

  getRepositories() {return Promise.resolve(this.responseGetAll)}
  search() {return Promise.resolve(this.responseSearch)}
}

describe('Results : ', () => {
  let component;
  let dtx  = new MockDataContext();
  let viewModel;
  let filters;
  let mockRepositoriesData;
  let searchObject;
  let eventAggregator;
  let dialogService;

  beforeEach( () => {
    jasmine.getFixtures().fixturesPath='base/test/mockdata/';
    mockRepositoriesData = JSON.parse(readFixtures('mock-repositories-data.json'));

    searchObject = {searchText: "carma"};
    dtx.responseGetAll = undefined;
    dtx.responseSearch = undefined;
    filters = new Filters();
    eventAggregator = new EventAggregator();
    dialogService = new DialogService();
    viewModel = new Results(dtx, filters, eventAggregator, dialogService, StageConfig);

    component = StageComponent
      .withResources('search/results')
      .inView('<Results></Results>')
      .boundTo(viewModel);

    component.bootstrap( aurelia => {
      aurelia.use.standardConfiguration();
      aurelia.use.plugin('aurelia-ui-virtualization');
      aurelia.container.registerInstance(DataContext, dtx);
      aurelia.container.registerInstance(Filters, filters);
      aurelia.container.registerInstance(EventAggregator, eventAggregator);
      aurelia.container.registerInstance(DialogService, dialogService);
      aurelia.container.registerInstance(StageConfig, StageConfig);
    });

  });

  it('Validate result text', (done) => {
    dtx.responseGetAll = mockRepositoriesData;
    dtx.responseSearch = mockRepositoriesData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      setTimeout(() => {
        let resultsText = document.querySelector('#results-result-text');
        expect(resultsText.innerHTML).toEqual('6 results for <strong>carma</strong>');
        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });
  it('Validate if filters are available', (done) => {
    dtx.responseGetAll = mockRepositoriesData;
    dtx.responseSearch = mockRepositoriesData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      setTimeout(() => {
        let filterOrganization = document.querySelector('#filterOrg');
        let filterLanguage = document.querySelector('#filterOrg');
        let ok = filterOrganization && filterLanguage ? true : false;
        expect(ok).toEqual(true);
        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });
  it('Validate Organization Filter works', (done) => {
    dtx.responseGetAll = mockRepositoriesData;
    dtx.responseSearch = mockRepositoriesData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      setTimeout(() => {
        $('#filterOrg').multiselect('select', ['usdot-fhwa-stol']);
        $('#filterOrg').trigger('change');
        expect(component.viewModel.resultCount).toEqual(2);
        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });
  it('Validate Organization Filter creates pill', (done) => {
    dtx.responseGetAll = mockRepositoriesData;
    dtx.responseSearch = mockRepositoriesData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      let filterValue = 'usdot-fhwa-stol';
      setTimeout(() => {
        $('#filterOrg').multiselect('select', [filterValue]);
        $('#filterOrg').trigger('change');
        component.viewModel.setupFilterOrg();
        setTimeout(() => {
          let v = document.getElementsByClassName('stage-chip');
          expect(v.length).toBeGreaterThan(0, 'No pills were created.');
          let hasPill = v[0].innerHTML.includes(filterValue);
          expect(hasPill).toEqual(true);
          done();
        }, 100);
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });
  it('Validate Language Filter works', (done) => {
    dtx.responseGetAll = mockRepositoriesData;
    dtx.responseSearch = mockRepositoriesData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      setTimeout(() => {
        $('#filterLang').multiselect('select', ['Java']);
        $('#filterLang').trigger('change');
        expect(component.viewModel.resultCount).toEqual(2);
        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });
  it('Validate Language Filter creates pill', (done) => {
    dtx.responseGetAll = mockRepositoriesData;
    dtx.responseSearch = mockRepositoriesData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      let filterValue = 'Java';
      setTimeout(() => {
        $('#filterLang').multiselect('select', [filterValue]);
        $('#filterLang').trigger('change');
        component.viewModel.setupFilterLang();
        setTimeout(() => {
          let v = document.getElementsByClassName('stage-chip');
          expect(v.length).toBeGreaterThan(0, 'No pills were created.');
          let hasPill = v[0].innerHTML.includes(filterValue);
          expect(hasPill).toEqual(true);
          done();
        }, 100);

      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });

  afterEach( () => {
    component.dispose();
  });
});
