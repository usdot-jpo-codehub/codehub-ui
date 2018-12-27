import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { Router } from 'aurelia-router'
import { DialogService } from 'aurelia-dialog';
import { DataContext } from '../../src/services/datacontext';
import { Insight } from '../../src/insight/insight';
import { MockDataInsightFindEnterpriseInsight } from '../mockdata/mock-data-insight-findEnterpriseInsight';
import { MockDataInsightGetAll } from '../mockdata/mock-data-insight-getAll';
import { NumValueConverter } from '../../src/resources/value-converters/num';
import { StageConfig } from '../../stageConf';

// Mocking Class DataContext (service)
export class MockDataContext {
  responseFindEnterpriseInsight = undefined;
  responseGetAll = undefined;

  findEnterpriseInsight() { return Promise.resolve(this.responseFindEnterpriseInsight) }
  getAll() {return Promise.resolve(this.responseGetAll) }
}

describe('Insight : ', () => {
  let component;
  let dctx = new MockDataContext();
  let router;
  let viewModel;
  let dialogService;
  let stageConfig = StageConfig;
  
  beforeEach( () => {    
    dctx.responseFindEnterpriseInsight = undefined;
    dctx.responseGetAll = undefined;
    router = {};
    dialogService = {};
    viewModel = new Insight(dctx, router, dialogService, stageConfig);

    component = StageComponent
      .withResources('insight/insight')
      .inView('<Insight></Insight>')
      .boundTo(viewModel);

    component.bootstrap(aurelia => {
      aurelia.use.standardConfiguration();
      aurelia.container.registerInstance(DataContext, dctx);
      aurelia.container.registerInstance(Router, router);
      aurelia.container.registerInstance(DialogService, dialogService);
      aurelia.container.registerInstance(StageConfig, stageConfig);
    });
  });

  it('Expect number of Organizations', (done) => {
    dctx.responseFindEnterpriseInsight = MockDataInsightFindEnterpriseInsight;
    dctx.responseGetAll = MockDataInsightGetAll;
    
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#number-of-organizations');
        const num = new NumValueConverter();
        expect(element.innerHTML).toEqual(''+num.toView(MockDataInsightFindEnterpriseInsight.number_of_organizations));
        done();
      }, 10);

      }).catch( e => { console.log(e.toString())});
  });

  it('Expect number of Projects', (done) => {
    dctx.responseFindEnterpriseInsight = MockDataInsightFindEnterpriseInsight;
    dctx.responseGetAll = MockDataInsightGetAll;
    
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#number-of-projects');
        const num = new NumValueConverter();
        expect(element.innerHTML).toEqual(''+num.toView(MockDataInsightFindEnterpriseInsight.number_of_projects));
        done();
      }, 10);

      }).catch( e => { console.log(e.toString())});
  });

  it('Expect number of Bugs and Vulnerabilities', (done) => {
    dctx.responseFindEnterpriseInsight = MockDataInsightFindEnterpriseInsight;
    dctx.responseGetAll = MockDataInsightGetAll;
    
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#bugs-vulnerabilities');
        const num = new NumValueConverter();
        expect(element.innerHTML).toEqual(''+num.toView(MockDataInsightFindEnterpriseInsight.bugs_vulnerabilities,1));
        done();
      }, 10);

      }).catch( e => { console.log(e.toString())});
  });

  it('Expect number of Technical Debt', (done) => {
    dctx.responseFindEnterpriseInsight = MockDataInsightFindEnterpriseInsight;
    dctx.responseGetAll = MockDataInsightGetAll;
    
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#technical-debt');
        const num = new NumValueConverter();
        expect(element.innerHTML).toEqual(''+num.toView(MockDataInsightFindEnterpriseInsight.technical_debt,2));
        done();
      }, 10);

      }).catch( e => { console.log(e.toString())});
  });

  it('Expect Most Used Languages Chart to be created', (done) => {
    dctx.responseFindEnterpriseInsight = MockDataInsightFindEnterpriseInsight;
    dctx.responseGetAll = MockDataInsightGetAll;
    
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#mostUsedLanguages');
        expect(element.innerHTML.trim()).not.toEqual('');
        done();
      }, 10);

      }).catch( e => { console.log(e.toString())});
  });

  it('Expect Most Used Languages Chart Data', (done) => {
    dctx.responseFindEnterpriseInsight = MockDataInsightFindEnterpriseInsight;
    dctx.responseGetAll = MockDataInsightGetAll;
    
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        let langStats = MockDataInsightFindEnterpriseInsight.language_counts_stat;
        langStats = Object.entries(langStats);
        langStats.sort(component.viewModel.multiArraySecondColumnDesc);
        const result = langStats.slice(0,5);
        const chartData = component.viewModel.mostUsedLanguages.data();
        expect(chartData.length).toBeGreaterThan(result.length-1);
        let expected ='';
        let realdata = '';
        for(let i = 0; i<result.length; i++) {
          expected += chartData[i].id + '-' + chartData[i].values[0].value + '|';
          realdata += result[i][0] + '-' + result[i][1] + '|';          
        }
        expect(expected).toEqual(realdata);
        done();
      }, 10);

      }).catch( e => { console.log(e.toString())});
  });

  it('Expect Top Projects by Forks Chart to be created', (done) => {
    dctx.responseFindEnterpriseInsight = MockDataInsightFindEnterpriseInsight;
    dctx.responseGetAll = MockDataInsightGetAll;
    
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#mfChart');
        expect(element.innerHTML.trim()).not.toEqual('');
        done();
      }, 10);

      }).catch( e => { console.log(e.toString())});
  });

  it('Expect Top Projects by Forks Chart Data', (done) => {
    dctx.responseFindEnterpriseInsight = MockDataInsightFindEnterpriseInsight;
    dctx.responseGetAll = MockDataInsightGetAll;
    
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        let forkAmount = MockDataInsightGetAll.map( x => x.forkedRepos.length);
        const chartData = component.viewModel.mfChart._api.getOption().series[0].data;
        expect(chartData.length).toEqual(forkAmount.length);
        let expected ='';
        let realdata = '';
        for(let i = 0; i<forkAmount.length; i++) {
          expected += forkAmount[i] + '|';
          realdata += chartData[i] + '|';          
        }
        expect(expected).toEqual(realdata);
        done();
      }, 10);

      }).catch( e => { console.log(e.toString())});
  });

  it('Expect Projects by Languages Chart to be created', (done) => {
    dctx.responseFindEnterpriseInsight = MockDataInsightFindEnterpriseInsight;
    dctx.responseGetAll = MockDataInsightGetAll;
    
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#main');
        expect(element.innerHTML.trim()).not.toEqual('');
        done();
      }, 10);

      }).catch( e => { console.log(e.toString())});
  });

  it('Expect Projects by Languages Chart Data', (done) => {
    dctx.responseFindEnterpriseInsight = MockDataInsightFindEnterpriseInsight;
    dctx.responseGetAll = MockDataInsightGetAll;
    
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const list = MockDataInsightFindEnterpriseInsight.language_counts_stat;
        const arr1 = Object.keys(list).sort((a, b) => list[a] - list[b]);
        const expectedData = arr1.map(k => MockDataInsightFindEnterpriseInsight.language_counts_stat[k]).slice(-10);
        const chartData = component.viewModel.mulChart._api.getOption().series[0].data;
        expect(chartData.length).toEqual(expectedData.length);
        let expected ='';
        let realdata = '';
        for(let i = 0; i<expectedData.length; i++) {
          expected += expectedData[i] + '|';
          realdata += chartData[i] + '|';          
        }
        expect(expected).toEqual(realdata);
            
        done();
      }, 10);

      }).catch( e => { console.log(e.toString())});
  });

  it('Expect Overall Source Code Health Chart to be created', (done) => {
    dctx.responseFindEnterpriseInsight = MockDataInsightFindEnterpriseInsight;
    dctx.responseGetAll = MockDataInsightGetAll;
    
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#main2');
        expect(element.innerHTML.trim()).not.toEqual('');
        done();
      }, 10);

      }).catch( e => { console.log(e.toString())});
  });

  it('Validate Overall Source Code Health Chart Data', (done) => {
    dctx.responseFindEnterpriseInsight = MockDataInsightFindEnterpriseInsight;
    dctx.responseGetAll = MockDataInsightGetAll;
    
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const expReliabilityData = component.viewModel.getDataForRadarChart(MockDataInsightFindEnterpriseInsight.metrics_summary.reliability);
        const expSecurityData = component.viewModel.getDataForRadarChart(MockDataInsightFindEnterpriseInsight.metrics_summary.security);
        const expMaintainabilityData = component.viewModel.getDataForRadarChart(MockDataInsightFindEnterpriseInsight.metrics_summary.maintainability);

        const crtReliabilityData = component.viewModel.myChart2._api.getOption().series[0].data[0].value;
        const crtSecurityData = component.viewModel.myChart2._api.getOption().series[1].data[0].value;
        const crtMaintainabilityData = component.viewModel.myChart2._api.getOption().series[2].data[0].value;

        expect(expReliabilityData.length).toEqual(crtReliabilityData.length, 'Unexpected Reliability data length');        
        let expected ='';
        let realdata = '';
        for(let i = 0; i<expReliabilityData.length; i++) {
          expected += expReliabilityData[i] + '|';
          realdata += crtReliabilityData[i] + '|';          
        }
        expect(expected).toEqual(realdata, 'Unexpected Reliability Data');

        expect(expSecurityData.length).toEqual(crtSecurityData.length, 'Unexpected Security data length');
        expected ='';
        realdata = '';
        for(let i = 0; i<expSecurityData.length; i++) {
          expected += expSecurityData[i] + '|';
          realdata += crtSecurityData[i] + '|';          
        }
        expect(expected).toEqual(realdata, 'Unexpected Security data');

        expect(expMaintainabilityData.length).toEqual(crtMaintainabilityData.length, 'Unexpected Maintainability data length');
        expected ='';
        realdata = '';
        for(let i = 0; i<expMaintainabilityData.length; i++) {
          expected += expMaintainabilityData[i] + '|';
          realdata += crtMaintainabilityData[i] + '|';          
        }
        expect(expected).toEqual(realdata, 'Unexpected Maintainability data');

        done();
      }, 100);

      }).catch( e => { console.log(e.toString())});
  });

  it('Expect multiArraySecondColumnDesc sort the an array of arrays by the second column in descending order.', (done) => {
    component.create(bootstrap).then( () => {
      
      const mockData = [['C++', 1], ['C#', 2], ['Java', 3]];
      mockData.sort(component.viewModel.multiArraySecondColumnDesc);

      expect(mockData[0][0]).toEqual('Java');
      expect(mockData[2][0]).toEqual('C++');
      done();
    });
  });

  it('Expect getDataForRadarChart return an array of values from a key-value object.', (done) => {
    component.create(bootstrap).then( () => {
      
      const mockData = {'A': 1, 'B': 2, 'C': 3};
      const result = component.viewModel.getDataForRadarChart(mockData);

      expect(result[0]).toEqual(1);
      expect(result[2]).toEqual(3);
      done();
    });
  });

  afterEach( () => {
    component.dispose();
  });

});

