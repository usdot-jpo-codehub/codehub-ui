import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import * as c3 from 'c3';
import * as echarts from 'echarts';
import { DataContext } from 'services/datacontext';
import { LeavingModal } from '../components/modals/leaving-modal';
import { StageConfig } from '../../stageConf';
@inject(DataContext, Router, DialogService, StageConfig)
export class Insight {
  constructor(dataContext, router, dialogService, stageConfig) {
    this.dataContext = dataContext;
    this.router = router;
    this.dialogService = dialogService;
    this.stageConfig = stageConfig;
    this.sonarqube_projects = `${this.stageConfig.SONARQUBE_ADDRESS}`;
    this.insights = [];
    this.projects = [];
    this.mulChart = {};
    this.mostUsedLanguages = {};
  }

  getData() {
    return Promise.all([
      this.dataContext.findEnterpriseInsight(),
      this.dataContext.getAll()]).then((values) => {
        this.insights = values[0];
        this.projects = JSON.parse(JSON.stringify(values[1]));
        this.projects = this.projects.sort((a, b) => {
          if (b.forkedRepos && a.forkedRepos) {
            return Number(b.forkedRepos.length) - Number(a.forkedRepos.length);
          }

          if (b.forkedRepos) {
            return b;
          }

          if (a.forkedRepos) {
            return a;
          }

          return null;
        });
        this.projects = this.projects.slice(0, 9);
        this.projects = this.projects.reverse();
        this.buildCharts();
      });
  }

  activate() {
    this.getData();
    window.addEventListener('resize', this.handleResize, false);
  }

  deactivate() {
    this.mostUsedLanguages.destroy();
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = (event) => {
    this.mulChart.resize();
  }

  buildCharts() {
    // Pie Chart
    let mul = this.insights.language_counts_stat;
    mul = Object.entries(mul);
    mul.sort(this.multiArraySecondColumnDesc);
    const mulTop = mul.slice(0, 5);
    const mulBot = mul.slice(6, mul.length);
    const mulOther = mulBot.reduce((a, b) => b[1] + a, 0);
    mulTop.push([`Other(${mulBot.length})`, mulOther]);
    this.mostUsedLanguages = c3.generate({
      bindto: '#mostUsedLanguages',
      data: {
        columns: mulTop,
        type: 'donut',
      },
      color: {
        pattern: ['#85C241', '#BAD432', '#009343', '#F7B719', '#BAD432', '#009343'],
      },
      donut: {
        width: 80,
        title: 'Languages',
      },
    });
    const chart = c3.generate({
      bindto: '#languageChart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25],
        ],
        types: {
          data1: 'bar',
        },
      },
      axis: {
        rotated: true,
      },
    });
    // /
    // / Bar Chart
    // /
    const list = this.insights.language_counts_stat;
    const arr1 = Object.keys(list).sort((a, b) => list[a] - list[b]);
    const arr2 = arr1.map(k => this.insights.language_counts_stat[k]);
    this.mulChart = echarts.init(document.getElementById('main'));
    this.mulChart.setOption({
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        show: true,
        feature: {
          mark: {
            show: true,
            title: {
              mark: 'mark',
              markUndo: 'undo',
              markClear: 'clear',
            },
            lineStyle: {
              width: 2,
              color: '#1e90ff',
              type: 'dashed',
            },
          },
          dataZoom: {
            show: true,
            title: {
              zoom: 'Zoom',
              back: 'Back',
            },
          },
          dataView: {
            show: true,
            title: 'Data',
            readOnly: true,
            lang: ['Data View', 'Close', 'Refresh'],
          },
          magicType: {
            show: true,
            title: {
              line: 'Line',
              bar: 'Bar',
            },
            type: ['line', 'bar'],
          },
          restore: {
            show: true,
            title: 'Reset',
          },
          saveAsImage: {
            show: true,
            title: 'Save',
            type: 'png',
            name: 'stage_projects_by_language',
          },
        },
      },
      calculable: true,
      xAxis: [
        {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
      ],
      yAxis: [
        {
          type: 'category',
          data: arr1.slice(-10),
        },
      ],
      series: [
        {
          name: 'Projects',
          type: 'bar',
          data: arr2.slice(-10),
        },
      ],
    });
    // /
    // / Bar Chart (most forks - mf)
    // /

    const forkProjectNames = this.projects.map(obj => obj.project_name);

    const forkAmount = this.projects.map(obj => obj.forkedRepos.length);

    this.mfChart = echarts.init(document.getElementById('mfChart'));
    this.mfChart.setOption({
      color: ['#334aff'],
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        show: true,
        feature: {
          mark: {
            show: true,
            title: {
              mark: 'mark',
              markUndo: 'undo',
              markClear: 'clear',
            },
            lineStyle: {
              width: 2,
              color: '#ff0a00',
              type: 'dashed',
            },
          },
          dataZoom: {
            show: true,
            title: {
              zoom: 'Zoom',
              back: 'Back',
            },
          },
          dataView: {
            show: true,
            title: 'Data',
            readOnly: true,
            lang: ['Data View', 'Close', 'Refresh'],
          },
          magicType: {
            show: true,
            title: {
              line: 'Line',
              bar: 'Bar',
            },
            type: ['line', 'bar'],
          },
          restore: {
            show: true,
            title: 'Reset',
          },
          saveAsImage: {
            show: true,
            title: 'Save',
            type: 'png',
            name: 'stage_most_forked_projects',
          },
        },
      },
      calculable: true,
      xAxis: [
        {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
      ],
      yAxis: [
        {
          type: 'category',
          data: forkProjectNames,
        },
      ],
      series: [
        {
          name: 'Projects',
          type: 'bar',
          data: forkAmount,
        },
      ],
    });
    // /
    // / 3 radius
    // /
    this.myChart2 = echarts.init(document.getElementById('main2'));
    const reliabilityData = this.getDataForRadarChart(this.insights.metrics_summary.reliability);
    const maxReliability = reliabilityData && reliabilityData.length > 0 ? Math.max(...reliabilityData) : 10;
    const securityData = this.getDataForRadarChart(this.insights.metrics_summary.security);
    const maxSecurity = securityData && securityData.length > 0 ? Math.max(...securityData) : 10;
    const maintainabilityData = this.getDataForRadarChart(this.insights.metrics_summary.maintainability);
    const maxMaintainability = maintainabilityData && maintainabilityData.length > 0 ? Math.max(...maintainabilityData) : 10;
    this.myChart2.setOption({
      title: [{
        text: 'Reliability',
        subtext: 'All Projects By Reliability Grade',
        x: '25%',
        textAlign: 'center',
      }, {
        text: 'Security',
        subtext: 'All Projects By Security Grade',
        x: '50%',
        textAlign: 'center',
      }, {
        text: 'Maintainability',
        subtext: 'All Projects By Maintainability Grade',
        x: '75%',
        textAlign: 'center',
      }],
      tooltip: {
        trigger: 'axis',
      },
      radar: [
        {
          indicator: [
            { text: 'A', max: maxReliability },
            { text: 'B', max: maxReliability },
            { text: 'C', max: maxReliability },
            { text: 'D', max: maxReliability },
            { text: 'E', max: maxReliability },
          ],
          center: ['25%', '55%'],
          radius: 80,
        },
        {
          indicator: [
            { text: 'A', max: maxSecurity },
            { text: 'B', max: maxSecurity },
            { text: 'C', max: maxSecurity },
            { text: 'D', max: maxSecurity },
            { text: 'E', max: maxSecurity },
          ],
          radius: 80,
          center: ['50%', '55%'],
        },
        {
          indicator: [
            { text: 'A', max: maxMaintainability },
            { text: 'B', max: maxMaintainability },
            { text: 'C', max: maxMaintainability },
            { text: 'D', max: maxMaintainability },
            { text: 'E', max: maxMaintainability },
          ],
          center: ['75%', '55%'],
          radius: 80,
        },
      ],
      series: [
        {
          type: 'radar',
          tooltip: {
            trigger: 'item',
          },
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: [
            {
              value: reliabilityData,
              name: 'Projects',
            },
          ],
        },
        {
          type: 'radar',
          tooltip: {
            trigger: 'item',
          },
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          radarIndex: 1,
          data: [
            {
              value: securityData,
              name: 'Projects',
            },
          ],
        },
        {
          type: 'radar',
          tooltip: {
            trigger: 'item',
          },
          radarIndex: 2,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: [
            {
              value: maintainabilityData,
              name: 'Projects',
            },
          ],
        },
      ],
    });
  }

  getDataForRadarChart(obj) {
    const result = [];

    if (!obj) {
      return result;
    }

    Object.keys(obj).forEach((x) => {
      result.push(obj[x]);
    });

    return result;
  }

  multiArraySecondColumnDesc(a, b) {
    if (a[1] === b[1]) {
      return 0;
    }
    return (a[1] > b[1]) ? -1 : 1;
  }

  openLeavingSiteConfirmation(name, url) {
    const mdl = { name, url };
    this.dialogService.open({ viewModel: LeavingModal, model: mdl });
  }
}
