import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';


describe('Test - Card Category : ', () => {

  let component;
  let mockCategoriesData;
  let viewCompose;
  let modelData;
  let getComponent;

  beforeEach( () => {
    jasmine.getFixtures().fixturesPath='base/test/mockdata/';
    mockCategoriesData = JSON.parse(readFixtures('mock-categories-data.json'));
    viewCompose = '<compose view-model="components/card-category" model.bind="cateData"></compose>';
    modelData = mockCategoriesData[0];

    getComponent = (modelData) => {
      let component = StageComponent.withResources('components/card-category')
      .inView(viewCompose)
      .boundTo({cateData: modelData});
      return component;
    };

    component = getComponent(modelData);

    component.bootstrap( aurelia => {
      aurelia.use.standardConfiguration();
    });

  });

  it('Expect name to be the title', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('.card-category_title');
      expect(mockCategoriesData[0].name).toEqual(element.innerText);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect to use image from url', (done) => {
    component.create(bootstrap).then( () => {
      const imgElements = document.querySelectorAll('img');
      expect(mockCategoriesData[0].imageFileName).toEqual(imgElements[0].getAttribute('src'));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect image to handle error', (done) => {
    component.create(bootstrap).then( () => {
      const imgElements = document.querySelectorAll('img');
      expect("this.onerror=null;this.src='/img/language-icons/unknown.svg';").toEqual(imgElements[0].getAttribute('onError'));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  afterEach( () => {
    component.dispose();
  });

});
