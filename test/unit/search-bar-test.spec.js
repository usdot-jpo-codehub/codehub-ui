import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { StageConfig } from '../../src/stageConf';

describe('Test Search Bar : ', () => {

  let component;

  beforeEach( () => {

    component = StageComponent.withResources('search/search-bar')
      .inView('<compose view-model="search/search-bar"></compose>');

    component.bootstrap( aurelia => {
      aurelia.use.standardConfiguration();
    });

  });

  it('Expect main title', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#search-bar_main-title');
      expect(element.innerHTML.indexOf('Explore ITS CodeHub') !== -1).toBe(true);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect main title aria-label', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#search-bar_main-title');
      const text = `Explore ITS CodeHub ${StageConfig.IS_BETA ? ', beta version' : ''}`;
      expect(element.getAttribute('aria-label')).toEqual(text);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect search input placeholder to be "Search for project names and languages..."', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#searchBar');
      expect(element.getAttribute('placeholder')).toEqual('Search for project names and languages...');
      done();
    }).catch( e => { console.log(e.toString()) });
  });
  it('Expect search button text to be "Search"', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#search-bar_search-button-text');
      expect(element.innerHTML).toEqual('Search');
      done();
    }).catch( e => { console.log(e.toString()) });
  });
  it('Expect text below search input to be equal to configuration text', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#search-bar_sub-text');
      expect(element.innerHTML).toEqual(StageConfig.HOME_TEXT_BELOW_SEARCH);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  afterEach( () => {
    component.dispose();
  });

});