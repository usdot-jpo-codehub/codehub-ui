import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { DataContext } from '../../src/services/datacontext';
import { Popular } from '../../src/popular/popular';

export class MockDataContext {
  response = undefined;

  findPopular() { return Promise.resolve(this.response) }
}

describe('Services: DataContext', () => {

  let component;
  let dt = new MockDataContext();
  let rt = {}
  let cf = {FEATURED_PROJECTS: []};
  let viewModel = new Popular(dt, rt, cf);
  let data = null;

  beforeEach( () => {
    jasmine.getFixtures().fixturesPath='base/test/mockdata/';

    dt.response = readFixtures('mock-project-data.json');
    component = StageComponent.withResources('popular/popular')
      .inView('<Popular></Popular>')
      .boundTo(viewModel);

    component.bootstrap(aurelia => {
      aurelia.use.standardConfiguration();
      aurelia.container.registerInstance(DataContext, dt); 
      // aurelia.container.registerInstance(Router, rt);
      // aurelia.container.registerInstance(StageConfig, cf);
    });
  });


  it('Test 1', (done) => {
    dt.response = MockDataContext;
    component.create(bootstrap).then(() => {
      // console.log(component);
      // console.log('--------------');
      // console.log(component.viewModel);
      // console.log('--------------');
      // console.log(component.viewModel.dataContext)
      // console.log('--------------');
      done();
    });

    let a = 1;
    expect(a).toEqual(1);
  });
});