import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import {EventAggregator} from 'aurelia-event-aggregator';
import { DialogService } from 'aurelia-dialog';
import { EA_MS_FEATURED_DATA } from '../../src/constants/ch-constants';

describe('Test - Carousel-Card: ', () => {

  let component;
  let mockRepositoriesData;
  let viewCompose;
  let getComponent;
  let eventAggregator;
  let dialogService;

  beforeEach( () => {
    jasmine.getFixtures().fixturesPath='base/test/mockdata/';
    mockRepositoriesData = JSON.parse(readFixtures('mock-repositories-data.json'));
    mockRepositoriesData.forEach( x => x.codehubData.badges.isFeatured = true);

    viewCompose = '<carousel-card repositories.bind="featured" caption="Repository Spotlight" />';
    eventAggregator = new EventAggregator();
    dialogService = undefined;

    getComponent = (repositories) => {
      let component = StageComponent.withResources('components/carousel-card')
      .inView(viewCompose)
      .boundTo({featured: repositories});
      return component;
    };

    component = getComponent(mockRepositoriesData);

    component.bootstrap( aurelia => {
      aurelia.use.standardConfiguration();
      aurelia.container.registerInstance(EventAggregator, eventAggregator);
      aurelia.container.registerInstance(DialogService, dialogService);
    });

  });

  it('Expect title caption', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector(`.carousel_title`).querySelector('h1');
      expect(element.innerHTML).toEqual('Repository Spotlight');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect to display 3 repositories', (done) => {
    component.create(bootstrap).then( () => {
      eventAggregator.publish(EA_MS_FEATURED_DATA, mockRepositoriesData);
      setTimeout(()=>{
        const elements = document.querySelectorAll('.card');
        expect(3).toEqual(elements.length);
        done();

      }, 200);
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect to have control to rotate left', (done) => {
    component.create(bootstrap).then( () => {
    const elements = document.querySelectorAll('.carousel_controls');
    const leftControl = elements[0].querySelector('button');
    expect('rotateLeft()').toEqual(leftControl.getAttribute('click.trigger'));
    done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect to have control to rotate right', (done) => {
    component.create(bootstrap).then( () => {
    const elements = document.querySelectorAll('.carousel_controls');
    const leftControl = elements[1].querySelector('button');
    expect('rotateRight()').toEqual(leftControl.getAttribute('click.trigger'));
    done();
    }).catch( e => { console.log(e.toString()) });
  });

  it(`Expect to have paginator that has a button for each repository`, (done) => {
    component.create(bootstrap).then( () => {
    const element = document.querySelector('.carousel_paginator');
    const buttons = element.querySelectorAll('button');
    expect(mockRepositoriesData.length).toEqual(buttons.length);
    done();
    }).catch( e => { console.log(e.toString()) });
  });

  it(`Expect to have a trigger action on a paginator's button`, (done) => {
    component.create(bootstrap).then( () => {
    const element = document.querySelector('.carousel_paginator');
    const buttons = element.querySelectorAll('button');
    const button = buttons[0];
    expect('centerTile($index)').toEqual(button.getAttribute('click.trigger'));
    done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect to rotate right', (done) => {
    component.create(bootstrap).then( () => {
      eventAggregator.publish(EA_MS_FEATURED_DATA, mockRepositoriesData);
      setTimeout(()=>{
        component.viewModel.rotateRight();
        setTimeout(()=> {
          const elements = document.querySelectorAll('.card');
          const element = elements[2].querySelector(`#card-popular-title-link-${mockRepositoriesData[3].id}`)
          expect(mockRepositoriesData[3].sourceData.name).toEqual(element.innerText);
          done();
        }, 200);
      }, 200);
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect to rotate left', (done) => {
    component.create(bootstrap).then( () => {
      eventAggregator.publish(EA_MS_FEATURED_DATA, mockRepositoriesData);
      setTimeout(()=>{
        component.viewModel.rotateLeft();
        setTimeout(()=> {
          const elements = document.querySelectorAll('.card');
          const element = elements[0].querySelector(`#card-popular-title-link-${mockRepositoriesData[mockRepositoriesData.length-1].id}`)
          expect(mockRepositoriesData[mockRepositoriesData.length-1].sourceData.name).toEqual(element.innerText);
          done();
        }, 200);
      }, 200);
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect to center tile', (done) => {
    component.create(bootstrap).then( () => {
      eventAggregator.publish(EA_MS_FEATURED_DATA, mockRepositoriesData);
      let index = 3;
      setTimeout(()=>{
        component.viewModel.centerTile(index);
        setTimeout(()=> {
          const elements = document.querySelectorAll('.card');
          const element = elements[1].querySelector(`#card-popular-title-link-${mockRepositoriesData[index].id}`)
          expect(mockRepositoriesData[index].sourceData.name).toEqual(element.innerText);
          done();
        }, 200);
      }, 200);
    }).catch( e => { console.log(e.toString()) });
  });

  afterEach( () => {
    component.dispose();
  });

});
