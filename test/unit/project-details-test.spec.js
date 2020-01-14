import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { Router } from 'aurelia-router';
import { ProjectDetails } from '../../src/project-details/project-details';
import { DataContext } from '../../src/services/datacontext';
import { DialogService } from 'aurelia-dialog';
// import { mockRepositoriesData } from '../mockdata/mock-project-data';
// import { MockDataInsightGetAll } from '../mockdata/mock-data-insight-getAll';
// import { MockCodeHealthiestData } from '../mockdata/mock-code-healthiest-data';
import { StageConfig } from '../../src/stageConf';
import { AgoValueConverter } from '../../src/resources/value-converters/ago';
import { NumValueConverter } from '../../src/resources/value-converters/num';
// import { MockDataComponentDependencies } from '../mockdata/mock-data-component-dependencies';

export class MockDataContext {
  constructor() {
    this.respFindSimilarProjects = undefined;
    this.respFindById = undefined;
    this.respGetHealthById = undefined;
    this.respGetComponentDependencies = undefined;

    jasmine.getFixtures().fixturesPath='base/test/mockdata/';

    this.mockRepositoriesData = JSON.parse(readFixtures('mock-repositories-data.json'));
  }

  findById(id) {
    let prj = this.mockRepositoriesData;
    let p = prj.filter(x => x.id === id);
    this.respFindById = p && p.length>0 ? p[0] : null;
    return Promise.resolve(this.respFindById);
  }

}

export class MockRouter {
  response = undefined;
  ensureConfigured() {return Promise.resolve(this.response)}
}

describe('Project Details : ', () => {
  let component;
  let dcx = new MockDataContext();
  let router = new MockRouter();
  let dialogService = {};
  let viewModel;
  let stageConfig;

  let mockRepositoriesData;

  beforeEach( () => {
    jasmine.getFixtures().fixturesPath='base/test/mockdata/';
    mockRepositoriesData = JSON.parse(readFixtures('mock-repositories-data.json'));
    stageConfig = StageConfig;

    viewModel = new ProjectDetails(dcx, router, dialogService, stageConfig);
    let params = {id:"0b5a091ecae902be1f8ae33fc0081218"};
    component = StageComponent
      .withResources('project-details/project-details')
      .inView('<compose view-model="project-details/project-details" model.bind="model"></compose>')
      .boundTo({model:params});

    component.bootstrap( aurelia => {
      aurelia.use.standardConfiguration();
      aurelia.container.registerInstance(DataContext, dcx);
      aurelia.container.registerInstance(Router, router);
      aurelia.container.registerInstance(DialogService, dialogService)
      aurelia.container.registerInstance(StageConfig, stageConfig);
    });

  });

  it('Expect Project Description', (done) => {
    router.response = true;

    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-description');
      expect(element.innerHTML).toEqual(mockRepositoriesData[0].sourceData.description);
      done();
    }).catch( e => {
      console.log(e.toString());
    });

  });

  it('Expects Project Organization link Click-Trigger to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector(`#project-organization-link-${mockRepositoriesData[0].id}`);
      expect(element.getAttribute('click.trigger')).toEqual('openLeavingSiteConfirmation(repo.sourceData.owner.name,repo.sourceData.owner.url,$event.target)');
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Organization link Text to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector(`#project-organization-link-${mockRepositoriesData[0].id}`);
      expect(element.innerHTML).toEqual(mockRepositoriesData[0].sourceData.owner.name);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Project Update At to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-update-at');
      let ago = new AgoValueConverter();
      expect(element.innerHTML).toEqual('Updated '+ago.toView(mockRepositoriesData[0].sourceData.lastPush));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Readme button Click-Trigger to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector(`#project-readme-button-${mockRepositoriesData[0].id}`);
      expect(element.getAttribute('click.trigger')).toEqual('openReadmeModal(repo,$event.target)');
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Readme button text to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-readme-button-text');
      expect(element.innerHTML).toEqual('Show README');
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Source link Click-Trigger to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector(`#project-source-link-${mockRepositoriesData[0].id}`);
      console.log('----------------------------------------------------------------------------');
      console.log(element);
      console.log('----------------------------------------------------------------------------');
      expect(element.innerHTML).toEqual('Github™');
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Source link Text to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector(`#project-source-link-${mockRepositoriesData[0].id}`);
      expect(element.innerHTML).toEqual('Github™');
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Stars to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-stars');
      let num = new NumValueConverter();
      expect(element.innerHTML).toEqual(''+num.toView(mockRepositoriesData[0].sourceData.stars));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Contributors to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-contributors');
      let num = new NumValueConverter();
      expect(element.innerHTML).toEqual(''+num.toView(mockRepositoriesData[0].sourceData.contributors.length));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Watchers to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-watchers');
      let num = new NumValueConverter();
      expect(element.innerHTML).toEqual(''+num.toView(mockRepositoriesData[0].sourceData.watchers));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Downloads to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-downloads');
      let num = new NumValueConverter();
      let downloads = 0;
      mockRepositoriesData[0].sourceData.releases.map( r => { downloads += r.total_downloads });
      expect(element.innerHTML).toEqual(''+num.toView(downloads));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Commits to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-commits');
      let num = new NumValueConverter();
      expect(element.innerHTML).toEqual(''+num.toView(mockRepositoriesData[0].sourceData.commits, 1));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Releases to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-releases');
      let num = new NumValueConverter();
      expect(element.innerHTML).toEqual(''+num.toView(mockRepositoriesData[0].sourceData.releases.length));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Forks to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-forks');
      let num = new NumValueConverter();
      expect(element.innerHTML).toEqual(''+num.toView(mockRepositoriesData[0].sourceData.forks.length));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Number of Projects Reusing Us', (done) => {
    component.create(bootstrap).then(() => {
      let visibleItems = document.querySelector('#project-list-reusing-us-visible').getElementsByTagName('li');
      let collapsedItems = document.querySelector('#project-list-reusing-us-collapse').getElementsByTagName('li');
      let total = (visibleItems.length) + (collapsedItems.length);

      expect(total).toEqual(mockRepositoriesData[0].sourceData.forks.length);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Maintainability Class Rating to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-maintainability-rating');
      let classValue = element.getAttribute('class');
      expect(classValue.includes(`rating-${mockRepositoriesData[0].generatedData.sonarMetrics.sqale_rating.frmt_val}`)).toBe(true);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Maintainability Rating value to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-maintainability-rating');
      expect(element.innerHTML.trim()).toEqual(mockRepositoriesData[0].generatedData.sonarMetrics.sqale_rating.frmt_val);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Maintainability code smells to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-maintainability-code-smells');
      expect(element.innerHTML).toEqual(`${mockRepositoriesData[0].generatedData.sonarMetrics.code_smells.val} code smells`);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Maintainability complexity to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-maintainability-complexity');
      expect(element.innerHTML).toEqual(`${mockRepositoriesData[0].generatedData.sonarMetrics.complexity.val} complexity`);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Reliability Class Rating to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-reliability-rating');
      let classValue = element.getAttribute('class');
      expect(classValue.includes(`rating-${mockRepositoriesData[0].generatedData.sonarMetrics.reliability_rating.frmt_val}`)).toBe(true);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Reliability Rating value to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-reliability-rating');
      expect(element.innerHTML.trim()).toEqual(mockRepositoriesData[0].generatedData.sonarMetrics.reliability_rating.frmt_val);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Reliability bugs to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-reliability-bugs');
      expect(element.innerHTML).toEqual(`${mockRepositoriesData[0].generatedData.sonarMetrics.bugs.val} bugs`);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Reliability violations to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-reliability-violations');
      expect(element.innerHTML).toEqual(`${mockRepositoriesData[0].generatedData.sonarMetrics.violations.val} violations`);
      done();
    }).catch( e => { console.log(e.toString())} );
  });




  it('Expects Security Class Rating to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-security-rating');
      let classValue = element.getAttribute('class');
      expect(classValue.includes(`rating-${mockRepositoriesData[0].generatedData.sonarMetrics.security_rating.frmt_val}`)).toBe(true);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Security Rating value to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-security-rating');
      expect(element.innerHTML.trim()).toEqual(mockRepositoriesData[0].generatedData.sonarMetrics.security_rating.frmt_val);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Security vulnerabilities to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-security-vulnerabilities');
      expect(element.innerHTML).toEqual(`${mockRepositoriesData[0].generatedData.sonarMetrics.vulnerabilities.val} vulnerabilities`);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  afterEach( () => {
    component.dispose();
  });

});