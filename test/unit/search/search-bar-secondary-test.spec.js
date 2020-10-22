import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { Router } from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import { DataContext } from '../../../src/services/datacontext';
import { SearchBarSecondary } from '../../../src/search/search-bar-secondary';

export class MockDataContext {
  responseSearch  = undefined;
  responseCategories = undefined;

  search(rq) {return Promise.resolve(this.responseSearch)}
  getCategories() {return Promise.resolve(this.responseCategories)}
}

export class MockRouter {
  navigateTo = undefined;
  navigateData = undefined;
  currentInstruction = {fragment: ''};
  navigateToRoute(name, obj) {this.navigateTo = name; this.navigateData = obj;}
  ensureConfigured(fx) {return Promise.resolve(fx)}
}

describe('Test - search/search-bar-secondary : ', () => {

  let testTimeout;
  let mockDataContext;
  let mockRouter;
  let eventAggregator;
  let component;
  let viewCompose;
  let getComponent;
  let isComponent;
  let viewModel;

  beforeEach( () => {
    testTimeout = 3000;
    viewCompose = '<search-bar-secondary></search-bar-secondary>';
    mockDataContext = new MockDataContext();
    eventAggregator = new EventAggregator();
    mockRouter = new MockRouter();

    viewModel = new SearchBarSecondary(mockDataContext, mockRouter, eventAggregator);
    getComponent = (vm) => {
      let comp = StageComponent
      .withResources('search/search-bar-secondary')
      .inView(viewCompose)
      .boundTo({viewModel: vm});

      comp.bootstrap( aurelia => {
        aurelia.use.standardConfiguration()
        aurelia.container.registerInstance(DataContext, mockDataContext);
        aurelia.container.registerInstance(Router, mockRouter);
        aurelia.container.registerInstance(EventAggregator, eventAggregator);
      });

      return comp;
    };

    component = getComponent(viewModel);
    isComponent = true;
  });

  afterEach(() =>{
    if(isComponent) {
      component.dispose();
    }
  });

  test('Test instance of the component', (done) => {
    component.create(bootstrap).then( () => {
      let obj = component.bindingContext.viewModel;
      expect(obj.searchText).toEqual('');
      eventAggregator.publish('searchExecuted', {text:'a', count:0});
      expect(obj.searchText).toEqual('a');
      eventAggregator.publish('detachResults', '');
      expect(obj.searchText).toEqual('');
      done();
    }).catch( e => { console.log(e.toString()) });
  }, testTimeout);

  test('Test executeSearch', (done) => {
    component.create(bootstrap).then( () => {
      let obj = component.bindingContext.viewModel;
      obj.executeSearch('test');
      expect(mockRouter.navigateTo).toEqual('results');
      done();
    }).catch( e => { console.log(e.toString()) });
  }, testTimeout);

  test('Test activate landing true', (done) => {
    mockRouter.currentInstruction.fragment = '/';
    component.create(bootstrap).then( () => {
      let obj = component.bindingContext.viewModel;
      obj.activate();
      expect(obj.landing).toBeTruthy();
      done();
    }).catch( e => { console.log(e.toString()) });
  }, testTimeout);

  test('Test activate landing false', (done) => {
    mockRouter.currentInstruction = null;
    component.create(bootstrap).then( () => {
      let obj = component.bindingContext.viewModel;
      obj.activate();
      expect(obj.landing).toBeFalsy();
      done();
    }).catch( e => { console.log(e.toString()) });
  }, testTimeout);

  test('Test triggerOnFocus', (done) => {
    mockRouter.currentInstruction = null;
    component.create(bootstrap).then( () => {
      let obj = component.bindingContext.viewModel;
      let testLabel = 'test';
      document.querySelector = (x) => {return {getAttribute: (y) => {return testLabel;}}};
      obj.triggerOnFocus();
      expect(obj.ariaLabel).toEqual(testLabel);
      done();
    }).catch( e => { console.log(e.toString()) });
  }, testTimeout);
});