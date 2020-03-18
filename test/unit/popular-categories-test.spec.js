import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import {EventAggregator} from 'aurelia-event-aggregator';
import { DialogService } from 'aurelia-dialog';
import { ES_MSG_CATEGORIES_DATA } from '../../src/constants/ch-constants';

describe('Test - Popular-categories: ', () => {

  let component;
  let mockCategoriesData;
  let viewCompose;
  let getComponent;
  let eventAggregator;
  let caption;

  beforeEach( () => {
    jasmine.getFixtures().fixturesPath='base/test/mockdata/';
    mockCategoriesData = JSON.parse(readFixtures('mock-categories-data.json'));
    mockCategoriesData.forEach( x => x.isPopular = true);
    caption = "Popular Categories";
    viewCompose = `<popular-categories caption="${caption}" />`;
    eventAggregator = new EventAggregator();

    getComponent = () => {
      let component = StageComponent.withResources('components/popular-categories')
      .inView(viewCompose);
      return component;
    };

    component = getComponent();

    component.bootstrap( aurelia => {
      aurelia.use.standardConfiguration();
      aurelia.container.registerInstance(EventAggregator, eventAggregator);
    });

  });

  it('Expect caption', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector(`.popular-categories_title`).querySelector('h1');
      expect(element.innerHTML).toEqual(caption);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect to display 3 categories', (done) => {
    component.create(bootstrap).then( () => {
      eventAggregator.publish(ES_MSG_CATEGORIES_DATA, mockCategoriesData);
      setTimeout(()=>{
        const elements = document.querySelectorAll('.card-category_wrapper');
        expect(3).toEqual(elements.length);
        done();

      }, 200);
    }).catch( e => { console.log(e.toString()) });
  });

  it('Validates order first category', (done) => {
    component.create(bootstrap).then( () => {
      eventAggregator.publish(ES_MSG_CATEGORIES_DATA, mockCategoriesData);
      setTimeout(()=>{
        const elements = document.querySelectorAll('.card-category_wrapper');
        const element = elements[0].querySelector('.card-category_title');
        expect(element.innerText).toEqual(mockCategoriesData[1].name);
        done();

      }, 200);
    });
  });

  it('Validates order last category', (done) => {
    component.create(bootstrap).then( () => {
      eventAggregator.publish(ES_MSG_CATEGORIES_DATA, mockCategoriesData);
      setTimeout(()=>{
        const elements = document.querySelectorAll('.card-category_wrapper');
        const element = elements[2].querySelector('.card-category_title');
        expect(element.innerText).toEqual(mockCategoriesData[0].name);
        done();

      }, 200);
    });
  });

  afterEach( () => {
    component.dispose();
  });

});
