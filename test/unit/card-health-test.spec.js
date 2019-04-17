import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { AgoValueConverter } from '../../src/resources/value-converters/ago';
import { NumValueConverter } from '../../src/resources/value-converters/num';
import { StageConfig } from '../../src/stageConf';

describe('Test - Card Health : ', () => {

  let component;
  let mockCodeHealthiestData;

  beforeEach( () => {
    jasmine.getFixtures().fixturesPath='base/test/mockdata/';
    mockCodeHealthiestData = JSON.parse(readFixtures('mock-code-healthiest-data.json'));
    component = StageComponent.withResources('components/card-health')
      .inView('<compose view-model="components/card-health" model.bind="repoData"></compose>')
      .boundTo({repoData: mockCodeHealthiestData[0]});

    component.bootstrap( aurelia => {
      aurelia.use.standardConfiguration();
    });

  });

  it('Expect title card link text to be project name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-title-link');
      expect(element.innerHTML).toEqual(mockCodeHealthiestData[0].project_name);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect title card link title to be project name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-title-link');
      expect(element.getAttribute('title')).toEqual(mockCodeHealthiestData[0].project_name);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect language name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('.org-name');
      let language = mockCodeHealthiestData[0].language;
      expect(element.innerHTML).toEqual(language && language !== undefined ? language : StageConfig.NO_LANG);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project description', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('.proj-desc');
      let pDescription = mockCodeHealthiestData[0].project_description;
      expect(element.innerHTML).toEqual(pDescription ? pDescription : '');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization link', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-organization-link');
      let orgLink = mockCodeHealthiestData[0].organizationUrl;
      expect(element.getAttribute('href')).toEqual(orgLink ? orgLink : '#');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization link title to be "View on Gitbub"', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-organization-link');
      expect(element.getAttribute('title')).toEqual('View on Github');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization text to be the organization name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-organization-link');
      expect(element.innerHTML).toEqual(mockCodeHealthiestData[0].organization);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization updated days', (done) => {
    component.create(bootstrap).then( () => {
      let ago = new AgoValueConverter();
      const element = document.querySelector('#card-health-organization-updated-text');
      expect(element.innerHTML).toEqual('Updated '+ago.toView(mockCodeHealthiestData[0].updatedAt));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization origin text', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-organization-origin-text');
      expect(element.innerHTML).toEqual(mockCodeHealthiestData[0].origin);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect Health status link url', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-health-status-link');
      expect(element.innerHTML).toEqual('SonarQube™');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of bugs', (done) => {
    component.create(bootstrap).then( () => {
      let num = new NumValueConverter();
      const element = document.querySelector('#card-health-project-bugs');
      expect(element.innerHTML).toEqual(''+num.toView(Number(mockCodeHealthiestData[0].metrics ? mockCodeHealthiestData[0].metrics.bugs.val : 0)));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project rating of reliabilty', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-project-bugs-rating');
      expect(element.innerHTML).toEqual(mockCodeHealthiestData[0].metrics.reliability_rating.data)
      const rating = 'rating-'+element.innerHTML;
      expect(element.getAttribute('class')).toContain(rating);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of vulnerabilities', (done) => {
    component.create(bootstrap).then( () => {
      let num = new NumValueConverter();
      const element = document.querySelector('#card-health-project-vulnerabilities');
      expect(element.innerHTML).toEqual(''+num.toView(Number(mockCodeHealthiestData[0].metrics ? mockCodeHealthiestData[0].metrics.vulnerabilities.val : 0)));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project rating of security', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-project-vulnerabilities-rating');
      expect(element.innerHTML).toEqual(mockCodeHealthiestData[0].metrics ? mockCodeHealthiestData[0].metrics.security_rating.data : '');
      const rating = 'rating-'+element.innerHTML;
      expect(element.getAttribute('class')).toContain(rating);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of technical debt in days', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-project-debt-days');
      expect(element.innerHTML).toEqual(mockCodeHealthiestData[0].metrics ? mockCodeHealthiestData[0].metrics.sqale_index.frmt_val : '');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project rating of technical debt', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-project-debt-days-rating');
      expect(element.innerHTML).toEqual(mockCodeHealthiestData[0].metrics ? mockCodeHealthiestData[0].metrics.sqale_rating.data : '');
      const rating = 'rating-'+element.innerHTML;
      expect(element.getAttribute('class')).toContain(rating);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project readme click trigger', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-project-open-readme');
      expect(element.getAttribute('click.trigger')).toEqual('openReadmeModal(repo)');
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