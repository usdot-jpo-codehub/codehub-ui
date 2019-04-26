import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { AgoValueConverter } from '../../src/resources/value-converters/ago';
import { NumValueConverter } from '../../src/resources/value-converters/num';

describe('Test - Card Search : ', () => {

  let component;
  let mockProjectData

  beforeEach( () => {
    jasmine.getFixtures().fixturesPath='base/test/mockdata/';
    mockProjectData = JSON.parse(readFixtures('mock-project-data.json'));
    component = StageComponent.withResources('components/card-search')
      .inView('<compose view-model="components/card-search" model.bind="repoData"></compose>')
      .boundTo({repoData: mockProjectData[0]});

    component.bootstrap( aurelia => {
      aurelia.use.standardConfiguration();
    });
  });

  it('Expect title card link text to be project name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-search-title-link');
      expect(element.innerHTML).toEqual(mockProjectData[0].project_name);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect title card link title to be project name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-search-title-link');
      const text = `Project name: ${mockProjectData[0].project_name}`;
      expect(element.getAttribute('aria-label')).toEqual(text);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect language name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('.org-name');
      expect(element.innerHTML).toEqual(mockProjectData[0].language);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project description', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('.proj-desc');
      expect(element.innerHTML).toEqual(mockProjectData[0].project_description);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization link', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-search-organization-link');
      expect(element.getAttribute('click.trigger')).toEqual('openLeavingSiteConfirmation(repo.organization,repo.organizationUrl)');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization link title to be "View on Gitbub"', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-search-organization-link');
      const text = `Project organization: ${mockProjectData[0].organization}, view on GitHub.`;
      expect(element.getAttribute('aria-label')).toEqual(text);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization text to be the organization name', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-search-organization-link-text');
      expect(element.innerHTML).toEqual(mockProjectData[0].organization);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization updated days', (done) => {
    component.create(bootstrap).then( () => {
      let ago = new AgoValueConverter();
      const element = document.querySelector('#card-search-organization-updated-text');
      expect(element.innerHTML).toEqual('Updated '+ago.toView(mockProjectData[0].updatedAt));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect organization origin text', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-search-organization-origin-text');
      expect(element.innerHTML).toEqual(mockProjectData[0].origin);
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project status link url', (done) => {
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#card-search-project-status-link');
      expect(element.getAttribute('click.trigger')).toEqual('openLeavingSiteConfirmation(repo.organization,repo.repositoryUrl)');
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of stars', (done) => {
    component.create(bootstrap).then( () => {
      let num = new NumValueConverter();
      const element = document.querySelector('#card-search-project-stars');
      expect(element.innerHTML).toEqual(num.toView(mockProjectData[0].stars));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of contributors', (done) => {
    component.create(bootstrap).then( () => {
      let num = new NumValueConverter();
      const element = document.querySelector('#card-search-project-contributors');
      expect(element.innerHTML).toEqual(num.toView(mockProjectData[0].contributors));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of watchers', (done) => {
    component.create(bootstrap).then( () => {
      let num = new NumValueConverter();
      const element = document.querySelector('#card-search-project-watchers');
      expect(element.innerHTML).toEqual(num.toView(mockProjectData[0].watchers));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of commits', (done) => {
    component.create(bootstrap).then( () => {
      let num = new NumValueConverter();
      const element = document.querySelector('#card-search-project-commits');
      expect(element.innerHTML).toEqual(num.toView(mockProjectData[0].commits, 1));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of releases', (done) => {
    component.create(bootstrap).then( () => {
      let num = new NumValueConverter();
      const element = document.querySelector('#card-search-project-releases');
      expect(element.innerHTML).toEqual(''+num.toView(mockProjectData[0].releases.length));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of forks', (done) => {
    component.create(bootstrap).then( () => {
      let num = new NumValueConverter();
      const element = document.querySelector('#card-search-project-forks');
      expect(element.innerHTML).toEqual(''+num.toView(mockProjectData[0].forks));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project number of dowloads', (done) => {
    component.create(bootstrap).then( () => {
      let num = new NumValueConverter();
      const element = document.querySelector('#card-search-project-downloads');
      let downloads = 0;
      mockProjectData[0].releases.forEach( e => downloads += e.total_downloads);
      expect(element.innerHTML).toEqual(''+num.toView(downloads));
      done();
    }).catch( e => { console.log(e.toString()) });
  });

  it('Expect project readme click trigger', (done) => {
    component.create(bootstrap).then( () => {
    const id = `#card-search-project-open-readme-${mockProjectData[0].id}`;
    const element = document.querySelector(id);
    expect(element.getAttribute('click.trigger')).toEqual('openReadmeModal(repo,$event.target)');
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