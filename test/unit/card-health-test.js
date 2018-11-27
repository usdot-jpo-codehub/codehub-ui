import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { MockProjectData } from '../mockdata/mock-project-data';
import { AgoValueConverter } from '../../src/resources/value-converters/ago';
import { NumValueConverter } from '../../src/resources/value-converters/num';


describe('Test - Card Health : ', () => {

  let component;

  beforeEach( () => {
    component = StageComponent.withResources('components/card-health')
      .inView('<compose view-model="components/card-health" model.bind="repoData"></compose>')
      .boundTo({repoData: MockProjectData[0]});

    component.bootstrap( aurelia => {
      aurelia.use.standardConfiguration();
    });

  });
  
  it('Expect title card link text to be project name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-title-link');
      expect(element.innerHTML).toEqual(MockProjectData[0].project_name);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect title card link title to be project name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-title-link');
      expect(element.getAttribute('title')).toEqual(MockProjectData[0].project_name);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect language name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('.org-name');
      expect(element.innerHTML).toEqual(MockProjectData[0].language);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project description', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('.proj-desc');
      expect(element.innerHTML).toEqual(MockProjectData[0].project_description);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization link', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-organization-link');
      expect(element.getAttribute('href')).toEqual(MockProjectData[0].organizationUrl);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization link title to be "View on Gitbub"', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-organization-link');
      expect(element.getAttribute('data-original-title')).toEqual('View on Github');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization text to be the organization name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-organization-link');
      expect(element.innerHTML).toEqual(MockProjectData[0].organization);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization updated days', (done) => {
    component.create(bootstrap).then( () => {
      let ago = new AgoValueConverter();
      const element = document.querySelector('#card-health-organization-updated-text');
      expect(element.innerHTML).toEqual('Updated '+ago.toView(MockProjectData[0].updatedAt));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization origin text', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-health-organization-origin-text');
      expect(element.innerHTML).toEqual(MockProjectData[0].origin);
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
      expect(element.innerHTML).toEqual('NOT IMPLEMENTED');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project rating of reliabilty', (done) => {
    component.create(bootstrap).then( () => { 
      let num = new NumValueConverter();     
      const element = document.querySelector('#card-health-project-bugs-rating');
      expect(element.innerHTML).toEqual('NOT IMPLEMENTED')
      const rating = 'rating-'+element.innerHTML;
      expect(element.getAttribute('class')).toContain(rating);      
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of vulnerabilities', (done) => {
    component.create(bootstrap).then( () => { 
      let num = new NumValueConverter();     
      const element = document.querySelector('#card-health-project-vulnerabilities');
      expect(element.innerHTML).toEqual('NOT IMPLEMENTED');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project rating of security', (done) => {
    component.create(bootstrap).then( () => { 
      let num = new NumValueConverter();     
      const element = document.querySelector('#ard-health-project-vulnerabilities-rating');
      expect(element.innerHTML).toEqual('NOT IMPLEMENTED')
      const rating = 'rating-'+element.innerHTML;
      expect(element.getAttribute('class')).toContain(rating);      
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of technical debt in days', (done) => {
    component.create(bootstrap).then( () => { 
      let num = new NumValueConverter();     
      const element = document.querySelector('#card-health-project-debt-days');
      expect(element.innerHTML).toEqual('NOT IMPLEMENTED');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project rating of technical debt', (done) => {
    component.create(bootstrap).then( () => { 
      let num = new NumValueConverter();     
      const element = document.querySelector('#card-health-project-debt-days-rating');
      expect(element.innerHTML).toEqual('NOT IMPLEMENTED')
      const rating = 'rating-'+element.innerHTML;
      expect(element.getAttribute('class')).toContain(rating);      
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project readme click trigger', (done) => {
    component.create(bootstrap).then( () => { 
      let num = new NumValueConverter();     
      const element = document.querySelector('#card-health-project-open-readme');
      expect(element.getAttribute('click.trigger')).toEqual('openReadmeModal(repo)');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect card link to use project-details route passing repo id', (done) => {
    component.create(bootstrap).then( () => { 
      let num = new NumValueConverter();     
      const element = document.querySelector('.card-link');
      expect(element.getAttribute('route-href')).toEqual('route:project-details; params.bind: {id:repo.id}');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  afterEach( () => {
    component.dispose();
  });

});