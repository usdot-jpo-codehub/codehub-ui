import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import {EventAggregator} from 'aurelia-event-aggregator';
import { DialogService } from 'aurelia-dialog';
import { HttpClient } from "aurelia-fetch-client";
import CHConstants from '../../src/constants/ch-constants';
import MockRepositoriesData from '../mockdata/mock-repositories-data.json';

describe('Test - Carousel-Card: ', () => {

  let component;
  let mockRepositoriesData;
  let viewCompose;
  let getComponent;
  let eventAggregator;
  let dialogService;
  let testTimeout;

  beforeEach( () => {
    testTimeout = 3000;
    MockRepositoriesData.forEach( x => x.codehubData.badges.isFeatured = true);

    viewCompose = '<carousel-card repositories.bind="featured" caption="Repository Spotlight" />';
    eventAggregator = new EventAggregator();
    dialogService = undefined;

    getComponent = (repositories) => {
      let component = StageComponent.withResources('components/carousel-card')
      .inView(viewCompose)
      .boundTo({featured: repositories});
      component.bootstrap( aurelia => {
        aurelia.use.standardConfiguration();
        aurelia.container.registerInstance(HttpClient);
        aurelia.container.registerInstance(EventAggregator, eventAggregator);
        aurelia.container.registerInstance(DialogService, dialogService);
      });
      return component;
    };

    component = getComponent(MockRepositoriesData);

  });

  test('Test instance', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector(`.carousel_title`).querySelector('h1');
      expect(element.innerHTML).toEqual('Repository Spotlight');
      done();
    }).catch( e => { console.log(e.toString()) });
  }, testTimeout);

});
