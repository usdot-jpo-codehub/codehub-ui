import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { Router } from 'aurelia-router';
import { ProjectDetails } from '../../src/project-details/project-details';
import { DataContext } from '../../src/services/datacontext';
import { DialogService } from 'aurelia-dialog';
import { MockProjectData } from '../mockdata/mock-project-data';
import { MockDataInsightGetAll } from '../mockdata/mock-data-insight-getAll';
import { MockCodeHealthiestData } from '../mockdata/mock-code-healthiest-data';
import { StageConfig } from '../../stageConf';
import { AgoValueConverter } from '../../src/resources/value-converters/ago';
import { NumValueConverter } from '../../src/resources/value-converters/num';
import { MockDataComponentDependencies } from '../mockdata/mock-data-component-dependencies';

export class MockDataContext {
  respFindSimilarProjects = undefined;
  respFindById = undefined;
  respGetHealthById = undefined;
  respGetComponentDependencies = undefined;

  findSimilarProjects(id) {
    let p = this.findById(id);
    if ( !p ) {
      return null;
    }

    let sims = MockDataInsightGetAll;
    let ps = sims.filter( x => x.language === p.language && x.id !== p.id);
    this.respFindSimilarProjects = ps && ps.length > 0 ? ps[0] : null;
    return Promise.resolve(this.respFileSimilarProjects)
  }
  findById(id) {
    let prj = MockProjectData;
    let p = prj.filter(x => x.id === id);
    this.respFindById = p && p.length>0 ? p[0] : null;
    return Promise.resolve(this.respFindById);
  }
  getHealthById(id) {
    let hd = MockCodeHealthiestData;
    let h = hd.filter(x => x.id === id);
    let hr = h && h.length ? h[0] : null;
    this.respGetHealthById = hr.metrics;
    return Promise.resolve(this.respGetHealthById);
  }
  getComponentDependencies(id){
    this.respGetComponentDependencies = {
      componentDependencies: MockDataComponentDependencies
    };
    return Promise.resolve(this.respGetComponentDependencies);
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

  beforeEach( () => {
    // dcx.respFindById = undefined;
    // dcx.respFindSimilarProjects = undefined;
    // dcx.respGetComponentDependencies = undefined;
    // dcx.respGetHealthById = undefined;
    stageConfig = StageConfig;
    viewModel = new ProjectDetails(dcx, router, dialogService, stageConfig);
    let params = {id:"23056647_72044729"};
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
      expect(element.innerHTML).toEqual(MockProjectData[0].project_description);
      done();
    }).catch( e => { console.log(e.toString())} );

  });

  it('Expects Project Organization link Click-Trigger to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-organization-link');
      expect(element.getAttribute('click.trigger')).toEqual('openLeavingSiteConfirmation(repo.organization,repo.organizationUrl)');
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Organization link Text to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-organization-link');
      expect(element.innerHTML).toEqual(MockProjectData[0].organization);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Project Update At to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-update-at');
      let ago = new AgoValueConverter();
      expect(element.innerHTML).toEqual(ago.toView(MockProjectData[0].updatedAt));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Origin to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-origin');
      expect(element.innerHTML).toEqual(MockProjectData[0].origin);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Readme button Click-Trigger to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-readme-button');
      expect(element.getAttribute('click.trigger')).toEqual('openReadmeModal(repo)');
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
      let element = document.querySelector('#project-source-link');
      expect(element.getAttribute('click.trigger')).toEqual('openLeavingSiteConfirmation(repo.organization,repo.repositoryUrl)');
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Source link Text to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-source-link');
      expect(element.innerHTML).toEqual('Github™');
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Stars to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-stars');
      let num = new NumValueConverter();
      expect(element.innerHTML).toEqual(''+num.toView(MockProjectData[0].stars));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Contributors to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-contributors');
      let num = new NumValueConverter();
      expect(element.innerHTML).toEqual(''+num.toView(MockProjectData[0].contributors));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Watchers to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-watchers');
      let num = new NumValueConverter();
      expect(element.innerHTML).toEqual(''+num.toView(MockProjectData[0].watchers));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Downloads to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-downloads');
      let num = new NumValueConverter();
      let downloads = 0;
      MockProjectData[0].releases.map( r => { downloads += r.total_downloads });
      expect(element.innerHTML).toEqual(''+num.toView(downloads));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Commits to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-commits');
      let num = new NumValueConverter();
      expect(element.innerHTML).toEqual(''+num.toView(MockProjectData[0].commits, 1));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Releases to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-releases');
      let num = new NumValueConverter();
      expect(element.innerHTML).toEqual(''+num.toView(MockProjectData[0].releases.length));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Project Stats Forks to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-stats-forks');
      let num = new NumValueConverter();
      expect(element.innerHTML).toEqual(''+num.toView(MockProjectData[0].forkedRepos.length));
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Number of Projects Reused By Us', (done) => {
    component.create(bootstrap).then(() => {
      let visibleItems = document.querySelector('#project-list-reused-by-us-visible').getElementsByTagName('li');
      let collapsedItems = document.querySelector('#project-list-reused-by-us-collapsed').getElementsByTagName('li');
      
      expect(visibleItems.length + collapsedItems.length).toEqual(MockDataComponentDependencies.length);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Number of Projects Reusing Us', (done) => {
    component.create(bootstrap).then(() => {
      let visibleItems = document.querySelector('#project-list-reusing-us-visible').getElementsByTagName('li');
      let collapsedItems = document.querySelector('#project-list-reusing-us-collapse').getElementsByTagName('li');
      let total = (visibleItems.length/2) + (collapsedItems.length/2); // the division by 2 is because there is a nested list to hold the org_name.
      
      expect(total).toEqual(MockProjectData[0].forkedRepos.length);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Maintainability Class Rating to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-maintainability-rating');
      let classValue = element.getAttribute('class');
      expect(classValue.includes(`rating-${MockCodeHealthiestData[0].metrics.sqale_rating.data}`)).toBe(true);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Maintainability Rating value to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-maintainability-rating');
      expect(element.innerHTML.trim()).toEqual(MockCodeHealthiestData[0].metrics.sqale_rating.data);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Maintainability code smells to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-maintainability-code-smells');
      expect(element.innerHTML).toEqual(`${MockCodeHealthiestData[0].metrics.code_smells.val} code smells`);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Maintainability complexity to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-maintainability-complexity');
      expect(element.innerHTML).toEqual(`${MockCodeHealthiestData[0].metrics.complexity.val} complexity`);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Reliability Class Rating to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-reliability-rating');
      let classValue = element.getAttribute('class');
      expect(classValue.includes(`rating-${MockCodeHealthiestData[0].metrics.reliability_rating.data}`)).toBe(true);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Reliability Rating value to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-reliability-rating');
      expect(element.innerHTML.trim()).toEqual(MockCodeHealthiestData[0].metrics.reliability_rating.data);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Reliability bugs to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-reliability-bugs');
      expect(element.innerHTML).toEqual(`${MockCodeHealthiestData[0].metrics.bugs.val} bugs`);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Reliability violations to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-reliability-violations');
      expect(element.innerHTML).toEqual(`${MockCodeHealthiestData[0].metrics.violations.val} violations`);
      done();
    }).catch( e => { console.log(e.toString())} );
  });




  it('Expects Security Class Rating to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-security-rating');
      let classValue = element.getAttribute('class');
      expect(classValue.includes(`rating-${MockCodeHealthiestData[0].metrics.security_rating.data}`)).toBe(true);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Security Rating value to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-security-rating');
      expect(element.innerHTML.trim()).toEqual(MockCodeHealthiestData[0].metrics.security_rating.data);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  it('Expects Security vulnerabilities to be', (done) => {
    component.create(bootstrap).then(() => {
      let element = document.querySelector('#project-security-vulnerabilities');
      expect(element.innerHTML).toEqual(`${MockCodeHealthiestData[0].metrics.vulnerabilities.val} vulnerabilities`);
      done();
    }).catch( e => { console.log(e.toString())} );
  });

  afterEach( () => {
    component.dispose();
  });

});