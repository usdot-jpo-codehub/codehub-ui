import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { Router } from 'aurelia-router';
import { DataContext } from '../../src/services/datacontext';
import { Filters } from '../../src/components/filters';
import { Explore } from '../../src/explore/explore';

// Mocking DataContext (service)

export class MockDataContext {
  response  = undefined;

  getAll() {return Promise.resolve(this.response)}
}

export class MockRouter {
  response = undefined;
  ensureConfigured() {return Promise.resolve(this.response)}
}

describe('Explore : ', () => {
  let component;
  let dtx  = new MockDataContext();
  let router = new MockRouter();
  let viewModel;
  let filters;
  let mockProjectData;

  beforeEach( () => {
    jasmine.getFixtures().fixturesPath='base/test/mockdata/';
    mockProjectData = JSON.parse(readFixtures('mock-project-data.json'));

    router.response = undefined;
    dtx.response = undefined;
    filters = new Filters();
    viewModel = new Explore(dtx, router, filters);

    component = StageComponent
      .withResources('explore/explore')
      .inView('<Explore></Explore>')
      .boundTo(viewModel);

    component.bootstrap( aurelia => {
      aurelia.use.standardConfiguration();
      aurelia.use.plugin('aurelia-ui-virtualization');
      aurelia.container.registerInstance(DataContext, dtx);
      aurelia.container.registerInstance(Router, router);
      aurelia.container.registerInstance(Filters, filters);
    });

  });

  it('Validate Organization filter selection', (done) => {
    dtx.response = mockProjectData;
    router.response = true;
    component.create(bootstrap).then(() => {
      component.viewModel.activate();
      setTimeout(() => {
        let expectedOrganizations = mockProjectData.map( x => x.organization)
          .filter( (v, i, a) => a.indexOf(v) == i );
        let element = document.querySelector('#filterOrg');

        expect(element.options.length).toEqual(expectedOrganizations.length, 'Unexpected number of Organizations');

        let expected = '';
        let data = '';
        for(let i=0; i<expectedOrganizations.length; i++) {
          expected += expectedOrganizations[i] + '|';
          data += element.options[i].value + '|';
        }
        expect(data).toEqual(expected, 'Unexpected Organizations');

        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });

  it('Validate Language filter selection', (done) => {
    dtx.response = mockProjectData;
    router.response = true;
    component.create(bootstrap).then(() => {
      component.viewModel.activate();
      setTimeout(() => {
        let expectedLanguages = mockProjectData.map( x => x.language)
          .filter( (v, i, a) => a.indexOf(v) == i );
        let element = document.querySelector('#filterLang');

        expect(element.options.length).toEqual(expectedLanguages.length, 'Unexpected number of Languages');

        let expected = '';
        let data = '';
        for(let i=0; i<expectedLanguages.length; i++) {
          expected += expectedLanguages[i] + '|';
          data += element.options[i].value + '|';
        }
        expect(data).toEqual(expected, 'Unexpected Organizations');

        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });

  it('Validate Origin filter selection', (done) => {
    dtx.response = mockProjectData;
    router.response = true;
    component.create(bootstrap).then(() => {
      component.viewModel.activate();
      setTimeout(() => {
        let expectedOrigin = mockProjectData.map( x => x.origin)
          .filter( (v, i, a) => a.indexOf(v) == i );
        let element = document.querySelector('#filterOrigin');

        expect(element.options.length).toEqual(expectedOrigin.length, 'Unexpected number of Origins');

        let expected = '';
        let data = '';
        for(let i=0; i<expectedOrigin.length; i++) {
          expected += expectedOrigin[i] + '|';
          data += element.options[i].value + '|';
        }
        expect(data).toEqual(expected, 'Unexpected Origins');

        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });

  it('Validate Sort list', (done) => {
    dtx.response = mockProjectData;
    router.response = true;
    component.create(bootstrap).then(() => {
      component.viewModel.activate();
      setTimeout(() => {
        let expectedSort = component.viewModel.sortOptions.map( x => x.value);
        let element = document.querySelector('#sortProperty');

        expect(element.options.length).toEqual(expectedSort.length, 'Unexpected number of option in Sort list');

        let expected = '';
        let data = '';
        for(let i=0; i<expectedSort.length; i++) {
          expected += expectedSort[i] + '|';
          data += element.options[i].value + '|';
        }
        expect(data).toEqual(expected, 'Unexpected option in Sort list');

        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });

  it('Validate Number of Projects', (done) => {
    dtx.response = mockProjectData;
    router.response = true;
    component.create(bootstrap).then(() => {
      component.viewModel.activate();
      setTimeout(() => {
        let element = document.querySelector('#explore-projects-count');
        expect(element.innerHTML).toEqual('('+component.viewModel.resultCount+')');
        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expect No Results message', (done) => {
    dtx.response = [];
    router.response = true;
    component.create(bootstrap).then(() => {
      component.viewModel.activate();
      setTimeout(() => {
        let element = document.querySelector('#explore-no-results');
        expect(element.innerHTML).toEqual('No Results');
        done();
      }, 100);
    }).catch( e => { console.log(e.toString())} );
  });

  it('Validate getUniqueValues ', (done) => {
    dtx.response = [];
    router.response = true;
    component.create(bootstrap).then(() => {
      let mockData = [{"id":1},{"id":1},{"id":2},{"id":2},{"id":3},{"id":3},{"id":4}];
      let result = component.viewModel.getUniqueValues(mockData, 'id');

      expect(result.length).toEqual(4);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Validate countUniqueValues ', (done) => {
    dtx.response = [];
    router.response = true;
    component.create(bootstrap).then(() => {
      let mockData = [{"letter":"A"},{"letter":"A"},{"letter":"B"},{"letter":"B"},{"letter":"C"},{"letter":"C"},{"letter":"D"}];      
      let result = component.viewModel.countUniqueValues(mockData, 'letter', 'B');
      expect(result).toEqual(2);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Validate filterArray ', (done) => {
    dtx.response = [];
    router.response = true;
    component.create(bootstrap).then(() => {
      let mockData = [{"case":1,"letter":"A"},{"case":1,"letter":"A"},{"case":2,"letter":"B"},{"case":2,"letter":"B"},{"case":3,"letter":"C"},{"case":3,"letter":"C"},{"case":4,"letter":"D"}];
      let result = component.viewModel.filterArray(mockData, [2,4],'case');
      expect(result.length).toEqual(3);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  afterEach( () => {
    component.dispose();
  });
});