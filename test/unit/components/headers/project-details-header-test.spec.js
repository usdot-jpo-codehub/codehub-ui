import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { HttpClient } from "aurelia-fetch-client";
import { ProjectDetailsHeader } from '../../../../src/components/headers/project-details-header';
import { StageConfig } from '../../../../src/stageConf';

export class MockDataContext {
  response  = undefined;

  findById(email) {return Promise.resolve(this.response)}
}

describe('Test - footer : ', () => {

  let testTimeout;
  let mockElement;
  let mockDataContext;
  let component;
  let viewCompose;
  let getComponent;
  let isComponent;
  let viewModel;

  beforeEach( () => {
    testTimeout = 3000;
    viewCompose = '<project-details-header></project-details-header>';
    mockDataContext = new MockDataContext();
    mockElement = {};

    viewModel = new ProjectDetailsHeader(mockDataContext, StageConfig);
    getComponent = (vm) => {
      let comp = StageComponent
      .withResources('components/headers/project-details-header')
      .inView(viewCompose)
      .boundTo({viewModel: vm});

      comp.bootstrap( aurelia => {
        aurelia.use.standardConfiguration();
        aurelia.container.registerInstance(HttpClient);
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
      expect(component.bindingContext.viewModel.exitDialogLinkId).toBeNull();
      done();
    }).catch( e => { console.log(e.toString()) });
  }, testTimeout);

  test('Test activate', (done) => {
    mockDataContext.response = {
      sourceData: {
        owner: {
          name: 'owner'
        },
        language: 'java',
        name: 'Testing'
      }
    };
    component.create(bootstrap).then( () => {
      let obj = component.bindingContext.viewModel;
      obj.activate({id:'id'});
      setTimeout(() => {
        expect(obj.repo.sourceData.name).toEqual('Testing');
        done();
      }, 100);
    }).catch( e => { console.log(e.toString()) });
  }, testTimeout);

  test('Test determineActivationStrategy', (done) => {
    component.create(bootstrap).then( () => {
      let obj = component.bindingContext.viewModel;
      let r = obj.determineActivationStrategy();
      expect(r).toEqual('replace')
      done();
    }).catch( e => { console.log(e.toString()) });
  }, testTimeout);

});
