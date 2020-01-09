import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { AgoValueConverter } from '../../src/resources/value-converters/ago';
import { NumValueConverter } from '../../src/resources/value-converters/num';
import { StageConfig } from '../../src/stageConf';
import { NO_DESCRIPTION_MESSAGE } from '../../src/constants/ch-contants';

describe('Test - Card Health : ', () => {

  let component;
  let mockRepositoriesData;

  beforeEach( () => {
    jasmine.getFixtures().fixturesPath='base/test/mockdata/';
    mockRepositoriesData = JSON.parse(readFixtures('mock-repositories-data.json'));
    component = StageComponent.withResources('components/card-health')
      .inView('<compose view-model="components/card-health" model.bind="repoData"></compose>')
      .boundTo({repoData: mockRepositoriesData[0]});

    component.bootstrap( aurelia => {
      aurelia.use.standardConfiguration();
    });

  });

  it('Expect title card link text to be project name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector(`#card-health-title-link-${mockRepositoriesData[0].id}`);
      expect(element.innerHTML).toEqual(mockRepositoriesData[0].sourceData.name);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect title card link title to be project name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector(`#card-health-title-link-${mockRepositoriesData[0].id}`);
      const text = `Project name: ${mockRepositoriesData[0].sourceData.name}`;
      expect(element.getAttribute('aria-label')).toEqual(text);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect language name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('.org-name');
      let language = mockRepositoriesData[0].sourceData.language;
      expect(element.innerHTML).toEqual(language && language != undefined ? language : StageConfig.NO_LANG);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project description', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('.proj-desc');
      let pDescription = mockRepositoriesData[0].sourceData.description;
      expect(element.innerText).toEqual(pDescription ? pDescription : NO_DESCRIPTION_MESSAGE);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization link', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector(`#card-health-organization-link-${mockRepositoriesData[0].id}`);
      expect(element.getAttribute('click.trigger')).toEqual('openLeavingSiteConfirmation(repo.sourceData.owner.name,repo.sourceData.owner.url,$event.target)');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization link title to be "View on Gitbub"', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector(`#card-health-organization-link-${mockRepositoriesData[0].id}`);
      const text = `Project organization: ${mockRepositoriesData[0].sourceData.owner.name}, view on GitHub.`;
      expect(element.getAttribute('aria-label')).toEqual(text);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization text to be the organization name', (done) => {
    component.create(bootstrap).then( () => {
      const id = `#card-health-organization-link-${mockRepositoriesData[0].id}`;
      const element = document.querySelector(id);
      expect(element.innerHTML).toEqual(mockRepositoriesData[0].sourceData.owner.name);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization updated days', (done) => {
    component.create(bootstrap).then( () => {
      let ago = new AgoValueConverter();
      const element = document.querySelector(`#card-health-organization-updated-text-${mockRepositoriesData[0].id}`);
      expect(element.innerHTML).toEqual('Updated '+ago.toView(mockRepositoriesData[0].sourceData.lastPush));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of bugs', (done) => {
    component.create(bootstrap).then( () => {
      let num = new NumValueConverter();
      const element = document.querySelector(`#card-health-project-bugs-${mockRepositoriesData[0].id}`);
      expect(element.innerHTML).toEqual(''+num.toView(Number(mockRepositoriesData[0].generatedData.sonarMetrics ? mockRepositoriesData[0].generatedData.sonarMetrics.bugs.val : 0)));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project rating of reliabilty', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector(`#card-health-project-bugs-rating-${mockRepositoriesData[0].id}`);
      expect(element.innerHTML).toEqual(mockRepositoriesData[0].generatedData.sonarMetrics.reliability_rating.frmt_val)
      const rating = 'rating-'+element.innerHTML;
      expect(element.getAttribute('class')).toContain(rating);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of vulnerabilities', (done) => {
    component.create(bootstrap).then( () => {
      let num = new NumValueConverter();
      const element = document.querySelector(`#card-health-project-vulnerabilities-${mockRepositoriesData[0].id}`);
      expect(element.innerHTML).toEqual(''+num.toView(Number(mockRepositoriesData[0].generatedData.sonarMetrics ? mockRepositoriesData[0].generatedData.sonarMetrics.vulnerabilities.val : 0)));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project rating of security', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector(`#card-health-project-vulnerabilities-rating-${mockRepositoriesData[0].id}`);
      expect(element.innerHTML).toEqual(mockRepositoriesData[0].generatedData.sonarMetrics ? mockRepositoriesData[0].generatedData.sonarMetrics.security_rating.frmt_val : '');
      const rating = 'rating-'+element.innerHTML;
      expect(element.getAttribute('class')).toContain(rating);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of technical debt in days', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector(`#card-health-project-debt-days-${mockRepositoriesData[0].id}`);
      expect(element.innerHTML).toEqual(mockRepositoriesData[0].generatedData.sonarMetrics ? mockRepositoriesData[0].generatedData.sonarMetrics.sqale_index.frmt_val : '');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project rating of technical debt', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector(`#card-health-project-debt-days-rating-${mockRepositoriesData[0].id}`);
      expect(element.innerHTML).toEqual(mockRepositoriesData[0].generatedData.sonarMetrics ? mockRepositoriesData[0].generatedData.sonarMetrics.sqale_rating.frmt_val : '');
      const rating = 'rating-'+element.innerHTML;
      expect(element.getAttribute('class')).toContain(rating);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project readme click trigger', (done) => {
    component.create(bootstrap).then( () => {
      const id = `#card-health-project-open-readme-${mockRepositoriesData[0].id}`;
      const element = document.querySelector(id);
      expect(element.getAttribute('click.trigger')).toEqual('openReadmeModal(repo,$event.target)');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect card link to use project-details route passing repo id', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('.card-link');
      expect(element.getAttribute('route-href')).toEqual('route:project-details; params.bind: {id:repo.id}');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  afterEach( () => {
    component.dispose();
  });

});