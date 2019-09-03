import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import * as echarts from 'echarts/dist/echarts';
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
    this.chartMostUsedLanguages = {};
    this.mostUsedLanguages = {};
    this.loading = true;
    this.exitDialogLinkId = null;
  }

  getData() {
    return Promise.all([
      this.dataContext.findEnterpriseInsight(),
      this.dataContext.getAll()]).then((values) => {
        this.insights = values[0];
        this.projects = values[1];
        if(typeof this.insights==='undefined' || typeof this.projects==='undefined') {
          return;
        }
        this.sortProjects(this.projects).then((projects) => {
          Promise.all([
            this.buildChartMostUsed(this.insights),
            this.buildChartLanguages(this.insights),
            this.buildChartForks(projects),
            this.buildChartHealth(projects),
          ]).then(() => {
            const self = this;
            setTimeout(() => {
              self.handleResize();
            }, 10, self);
            this.loading = false;
          });
        }).catch((e) => {
          return;
        });
      });
  }

  sortProjects(projects) {
    return new Promise((resolve, reject) => {
      try {
        projects = projects.sort((a, b) => {
          if (b.forkedRepos && a.forkedRepos) {
            return Number(b.forkedRepos.length) - Number(a.forkedRepos.length);
          }
          if (b.forkedRepos) {
            return 1;
          }
          if (a.forkedRepos) {
            return -1;
          }
          return null;
        });
        projects = projects.slice(0, 9);
        projects = projects.reverse();
        resolve(projects);
      } catch (e) {
        reject(e);
      }
    });
  }

  activate() {
    this.loading = true;
  }

  attached() {
    this.getData();
    window.addEventListener('resize', this.handleResize, false);
  }

  deactivate() {
    // this.mostUsedLanguages.destroy();
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = (event) => {
    this.mulChart.resize();
    this.mfChart.resize();
    this.myChart2.resize();
    this.chartMostUsedLanguages.resize();
    // this.mostUsedLanguages.resize();
  }

  buildChartMostUsed(insights) {
    const calc = new Promise((resolve, reject) => {
      // Pie Chart
      let mul = insights.language_counts_stat;
      mul = Object.entries(mul);
      mul.sort(this.multiArraySecondColumnDesc);
      const mulTop = mul.slice(0, 5);
      const mulBot = mul.slice(6, mul.length);
      const mulOther = mulBot.reduce((a, b) => b[1] + a, 0);
      mulTop.push([`Other(${mulBot.length})`, mulOther]);
      let data = mulTop.map((item) => {
        let r = {value:item[1],name:item[0]};
        return r;
      });
      resolve(data);
    });

    calc.then((data) => {
      data = this.injectColorStyle(data);
      this.chartMostUsedLanguages = echarts.init(document.getElementById('chartMostUsedLanguajes'));
      this.chartMostUsedLanguages.setOption({
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
            dataZoom: {
              show: false,
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
            restore: {
              show: true,
              title: 'Reset',
            },
            saveAsImage: {
              show: true,
              title: 'Save',
              type: 'png',
              name: 'codehub_most_used_languages',
            },
          },
        },
        calculable: true,
        
        series: [
          {
              name:'Most Used Languages',
              type:'pie',
              radius : '50%',
              center: ['50%', '50%'],
              data: data,
              label: {
                normal: {
                    position: 'outside',
                    formatter: '{b}\r\n{d}%',
                    color: 'rgba(0,0,0,1)'
                }
              },
              itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
  
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                  return Math.random() * 200;
              }
          }
        ],
      });
    });
  }

  injectColorStyle(data) {
    //wong's palette color
    let colors = ['#D55E00','#0072B2','#F0E442','#CC79A7','#009E73','#56B4E9','#E69F00'];
    let c = 0;
    for(let i=0; i<data.length; i++){
      let item = data[i];
      item.itemStyle = {color: colors[c]};
      data[i] = item;
      c++
      if(c >= data.length) {
        c = 0;
      }
    }
    return data;
  }

  buildChartLanguages(insights) {
    const calc = new Promise((resolve, reject) => {
      const list = this.insights.language_counts_stat;
      let arr1 = Object.keys(list).sort((a, b) => list[a] - list[b]);
      arr1 = arr1.slice(-10);
      let arr2 = arr1.map(k => this.insights.language_counts_stat[k]);
      arr2 = arr2.slice(-10);
      const result = { arr1, arr2 };
      resolve(result);
    });

    calc.then((data) => {
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
            data: data.arr1,
          },
        ],
        series: [
          {
            name: 'Projects',
            type: 'bar',
            data: data.arr2,
          },
        ],
      });
    });
  }

  buildChartForks(projects) {
    const calc = new Promise((resolve, reject) => {
      const forkProjectNames = projects.map(obj => obj.project_name);
      const forkAmount = projects.map(obj => obj.forkedRepos.length);
      const result = { forkProjectNames, forkAmount };
      resolve(result);
    });

    calc.then((data) => {
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
            data: data.forkProjectNames,
          },
        ],
        series: [
          {
            name: 'Projects',
            type: 'bar',
            data: data.forkAmount,
          },
        ],
      });
    });
  }

  buildChartHealth(projects) {
    const calc = new Promise((resolve, reject) => {
      const reliabilityData = this.getDataForRadarChart(this.insights.metrics_summary.reliability);
      const maxReliability = reliabilityData && reliabilityData.length > 0 ? Math.max(...reliabilityData) : 10;
      const securityData = this.getDataForRadarChart(this.insights.metrics_summary.security);
      const maxSecurity = securityData && securityData.length > 0 ? Math.max(...securityData) : 10;
      const maintainabilityData = this.getDataForRadarChart(this.insights.metrics_summary.maintainability);
      const maxMaintainability = maintainabilityData && maintainabilityData.length > 0 ? Math.max(...maintainabilityData) : 10;

      const result = {
        reliabilityData,
        maxReliability,
        securityData,
        maxSecurity,
        maintainabilityData,
        maxMaintainability,
      };

      resolve(result);
    });

    calc.then((data) => {
      this.myChart2 = echarts.init(document.getElementById('main2'));
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
              { text: 'A', max: data.maxReliability },
              { text: 'B', max: data.maxReliability },
              { text: 'C', max: data.maxReliability },
              { text: 'D', max: data.maxReliability },
              { text: 'E', max: data.maxReliability },
            ],
            center: ['25%', '55%'],
            radius: 80,
          },
          {
            indicator: [
              { text: 'A', max: data.maxSecurity },
              { text: 'B', max: data.maxSecurity },
              { text: 'C', max: data.maxSecurity },
              { text: 'D', max: data.maxSecurity },
              { text: 'E', max: data.maxSecurity },
            ],
            radius: 80,
            center: ['50%', '55%'],
          },
          {
            indicator: [
              { text: 'A', max: data.maxMaintainability },
              { text: 'B', max: data.maxMaintainability },
              { text: 'C', max: data.maxMaintainability },
              { text: 'D', max: data.maxMaintainability },
              { text: 'E', max: data.maxMaintainability },
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
                value: data.reliabilityData,
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
                value: data.securityData,
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
                value: data.maintainabilityData,
                name: 'Projects',
              },
            ],
          },
        ],
      });
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

  openLeavingSiteConfirmation(name, url, target) {
    this.exitDialogLinkId = target.getAttribute('id');
    const mdl = { name, url };
    this.dialogService.open({ viewModel: LeavingModal, model: mdl, lock: false }).whenClosed( response => {
      const element = document.querySelector('#'+this.exitDialogLinkId);
      if(element) {
        element.focus();
      }
    });
  }
}
