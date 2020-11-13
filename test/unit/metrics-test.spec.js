import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { Router } from 'aurelia-router'
import { DialogService } from 'aurelia-dialog';
import { DataContext } from '../../src/services/datacontext';
import { Metrics } from '../../src/metrics/metrics';
import { NumValueConverter } from '../../src/resources/value-converters/num';
import { DurationValueConverter } from '../../src/resources/value-converters/duration';
import { StageConfig } from '../../src/stageConf';

// Mocking Class DataContext (service)
export class MockDataContext {
  responseMetrics = undefined;
  responseRepositories = undefined;

  getMetrics() { return Promise.resolve(this.responseMetrics) }
  getRepositories() {return Promise.resolve(this.responseRepositories) }
}

describe('Metrics : ', () => {
  let component;
  let dctx = new MockDataContext();
  let router;
  let viewModel;
  let dialogService;
  let stageConfig = StageConfig;
  let mockDataMetricsFindEnterpriseInsight;
  let mockDataMetricsGetAll;

  beforeEach( () => {
    jasmine.getFixtures().fixturesPath='base/test/mockdata/';
    mockDataMetricsFindEnterpriseInsight = JSON.parse(readFixtures('mock-metrics-data.json'));
    mockDataMetricsGetAll = JSON.parse(readFixtures('mock-repositories-data.json'));

    dctx.responseMetrics = undefined;
    dctx.responseRepositories = undefined;
    router = {};
    dialogService = {};
    viewModel = new Metrics(dctx, router, dialogService, stageConfig);

    component = StageComponent
      .withResources('metrics/metrics')
      .inView('<Metrics><Metrics>')
      .boundTo(viewModel);

    component.bootstrap(aurelia => {
      aurelia.use.standardConfiguration();
      aurelia.container.registerInstance(DataContext, dctx);
      aurelia.container.registerInstance(Router, router);
      aurelia.container.registerInstance(DialogService, dialogService);
      aurelia.container.registerInstance(StageConfig, stageConfig);
    });
  });

  it('Expect title', (done) => {
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#id-metrics-title');
      expect(element.innerText).toEqual('Metrics');
      done();
    }).catch( e => { console.log(e.toString())});
  });

  it('Expect description', (done) => {
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
    component.create(bootstrap).then( () => {
      const element = document.querySelector('#id-metrics-description');
      expect(element.innerText).not.toEqual("");
      done();
    }).catch( e => { console.log(e.toString())});
  });

  it('Expect number of Organizations', (done) => {
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#id-organization');
        let txt = element.options[element.selectedIndex].text;
        const num = new NumValueConverter();
        let orgs = num.toView(mockDataMetricsFindEnterpriseInsight.numberOfOrganizations);
        let expected = 'All'+(orgs>0 ? ' ('+orgs+')' : '');
        expect(expected).toEqual(txt);
        done();
      }, 10);
      }).catch( e => { console.log(e.toString())});
  });

  it('Expect number of Projects', (done) => {
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#number-of-projects');
        const num = new NumValueConverter();
        expect(element.innerHTML).toEqual(''+num.toView(mockDataMetricsFindEnterpriseInsight.numberOfProjects));
        done();
      }, 10);
      }).catch( e => { console.log(e.toString())});
  });

  it('Expect number of Bugs and Vulnerabilities', (done) => {
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#bugs-vulnerabilities');
        const num = new NumValueConverter();
        expect(element.innerHTML).toEqual(''+num.toView(mockDataMetricsFindEnterpriseInsight.bugsVulnerabilities,1));
        done();
      }, 10);

      }).catch( e => { console.log(e.toString())});
  });

  it('Expect number of Technical Debt', (done) => {
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#technical-debt');
        const duration = new DurationValueConverter();
        expect(element.innerHTML).toEqual(''+duration.toView(mockDataMetricsFindEnterpriseInsight.technicalDebt));
        done();
      }, 10);
      }).catch( e => { console.log(e.toString())});
  });

  it('Expect Most Used Languages Chart to be created', (done) => {
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const element = document.querySelector('#chartMostUsedLanguajes');
        expect(element.innerHTML.trim()).not.toEqual('');
        done();
      }, 10);
      }).catch( e => { console.log(e.toString())});
  });

  it('Expect Most Used Languages Chart Data', (done) => {
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        let langStats = mockDataMetricsFindEnterpriseInsight.languageCountsStat;
        langStats = Object.entries(langStats);
        langStats.sort(component.viewModel.multiArraySecondColumnDesc);
        const result = langStats.slice(0,5);
        const chartData = component.viewModel.chartMostUsedLanguages._api.getOption().series[0].data;
        expect(chartData.length).toBeGreaterThan(result.length-1);
        let expected ='';
        let realdata = '';
        for(let i = 0; i<result.length; i++) {
          expected += chartData[i].name + '-' + chartData[i].value + '|';
          realdata += result[i][0] + '-' + result[i][1] + '|';
        }
        expect(expected).toEqual(realdata);
        done();
      }, 10);
      }).catch( e => { console.log(e.toString())});
  });

  it('Expect Top Projects by Forks Chart to be created', (done) => {
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
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
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        let forkAmount = mockDataMetricsGetAll.map( x => x.sourceData.forksCount).reverse();
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
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
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
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const list = mockDataMetricsFindEnterpriseInsight.languageCountsStat;
        let arr1 = Object.keys(list).sort((a, b) => list[a] - list[b]);
        const expectedData = arr1.map(k => mockDataMetricsFindEnterpriseInsight.languageCountsStat[k]).slice(-6);
        const chartData = component.viewModel.mulChart._api.getOption().series[0].data;
        expect(chartData.length).toEqual(expectedData.length);
        let expected ='';
        let realdata = '';
        for(let i = 0; i<expectedData.length; i++) {
          expected += expectedData[i] != 0 ? expectedData[i] + '|' : '';
          realdata += (typeof chartData[i]) == 'number' ? chartData[i] + '|' : '';
        }
        expect(expected).toEqual(realdata);
        done();
      }, 10);
      }).catch( e => { console.log(e.toString())});
  });

  it('Expect Overall Source Code Health Chart to be created', (done) => {
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
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
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;

    component.create(bootstrap).then( () => {
      component.viewModel.activate();
      setTimeout(() => {
        const expReliabilityData = component.viewModel.getDataForRadarChart(mockDataMetricsFindEnterpriseInsight.metricsSummary.reliability.values);
        const expSecurityData = component.viewModel.getDataForRadarChart(mockDataMetricsFindEnterpriseInsight.metricsSummary.security.values);
        const expMaintainabilityData = component.viewModel.getDataForRadarChart(mockDataMetricsFindEnterpriseInsight.metricsSummary.maintainability.values);

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
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
    component.create(bootstrap).then( () => {
      const mockData = [['C++', 1], ['C#', 2], ['Java', 3]];
      mockData.sort(component.viewModel.multiArraySecondColumnDesc);
      expect(mockData[0][0]).toEqual('Java');
      expect(mockData[2][0]).toEqual('C++');
      done();
    });
  });

  it('Expect getDataForRadarChart return an array of values from a key-value object.', (done) => {
    dctx.responseMetrics = mockDataMetricsFindEnterpriseInsight;
    dctx.responseRepositories = mockDataMetricsGetAll;
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

