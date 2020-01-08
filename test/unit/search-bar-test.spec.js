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
      expect(element.innerHTML.indexOf('Welcome to ITS CodeHub') !== -1).toBe(true);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect main title aria-label', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#search-bar_main-title');
      const text = `Welcome to ITS CodeHub ${StageConfig.IS_BETA ? ', beta version' : ''}`;
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
  it('Expect search button icon to be "search"', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#search-bar_search-button-icon');
      expect(element.innerHTML).toEqual('search');
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
      const element = document.querySelector('#search-bar_text-below-search');
      expect(element.innerHTML).toEqual(StageConfig.HOME_TEXT_BELOW_SEARCH);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  afterEach( () => {
    component.dispose();
  });

});