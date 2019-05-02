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

  getAll() {return Promise.resolve(this.responseGetAll)}
  search() {return Promise.resolve(this.responseSearch)}
}

describe('Results : ', () => {
  let component;
  let dtx  = new MockDataContext();
  let viewModel;
  let filters;
  let mockProjectData;
  let searchObject;
  let eventAggregator;
  let dialogService;

  beforeEach( () => {
    jasmine.getFixtures().fixturesPath='base/test/mockdata/';
    mockProjectData = JSON.parse(readFixtures('mock-project-data.json'));

    searchObject = {searchText: "asn.1"};
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
    dtx.responseGetAll = mockProjectData;
    dtx.responseSearch = mockProjectData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      setTimeout(() => {
        let resultsText = document.querySelector('#results-result-text');
        expect(resultsText.innerHTML).toEqual('6 results for <strong>asn.1</strong>');
        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });
  it('Validate if filters are available', (done) => {
    dtx.responseGetAll = mockProjectData;
    dtx.responseSearch = mockProjectData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      setTimeout(() => {
        let filterOrganization = document.querySelector('#filterOrg');
        let filterLanguage = document.querySelector('#filterOrg');
        let filterOrigin = document.querySelector('#filterOrg');
        let ok = filterOrganization && filterLanguage && filterOrigin ? true : false;
        expect(ok).toEqual(true);
        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });
  it('Validate Organization Filter works', (done) => {
    dtx.responseGetAll = mockProjectData;
    dtx.responseSearch = mockProjectData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      setTimeout(() => {
        $('#filterOrg').multiselect('select', ['fedspendingtransparency']);
        $('#filterOrg').trigger('change');
        expect(component.viewModel.resultCount).toEqual(5);
        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });
  it('Validate Organization Filter creates pill', (done) => {
    dtx.responseGetAll = mockProjectData;
    dtx.responseSearch = mockProjectData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      let filterValue = 'fedspendingtransparency';
      setTimeout(() => {
        $('#filterOrg').multiselect('select', [filterValue]);
        $('#filterOrg').trigger('change');
        component.viewModel.setupFilterOrigin();
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
    dtx.responseGetAll = mockProjectData;
    dtx.responseSearch = mockProjectData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      setTimeout(() => {
        $('#filterLang').multiselect('select', ['Python']);
        $('#filterLang').trigger('change');
        expect(component.viewModel.resultCount).toEqual(2);
        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });
  it('Validate Language Filter creates pill', (done) => {
    dtx.responseGetAll = mockProjectData;
    dtx.responseSearch = mockProjectData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      let filterValue = 'Python';
      setTimeout(() => {
        $('#filterLang').multiselect('select', [filterValue]);
        $('#filterLang').trigger('change');
        component.viewModel.setupFilterOrigin();
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
  it('Validate Origin Filter works', (done) => {
    dtx.responseGetAll = mockProjectData;
    dtx.responseSearch = mockProjectData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      setTimeout(() => {
        $('#filterOrigin').multiselect('select', ['PRIVATE']);
        $('#filterOrigin').trigger('change');
        expect(component.viewModel.resultCount).toEqual(1);
        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });
  it('Validate Language Filter creates pill', (done) => {
    dtx.responseGetAll = mockProjectData;
    dtx.responseSearch = mockProjectData;
    component.create(bootstrap).then(() => {
      component.viewModel.activate(searchObject);
      let filterValue = 'PRIVATE';
      setTimeout(() => {
        $('#filterOrigin').multiselect('select', [filterValue]);
        $('#filterOrigin').trigger('change');
        component.viewModel.setupFilterOrigin();
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
