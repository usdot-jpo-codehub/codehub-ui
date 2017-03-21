import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import * as c3 from 'c3';
//import * as echarts from 'echarts';
import {DataContext} from 'services/datacontext';

@inject(DataContext, Router)
export class Insight {

  constructor(dataContext, router) {
    this.dataContext = dataContext;
    this.router = router;

    this.insights = [];

    this.mostUsedLanguages = {};
  }

  getData() {
    return this.dataContext.findEnterpriseInsight().then(results => {
      this.insights = results;
      this.buildCharts();
    });
  }

  activate() {
    this.getData();
  }

  buildCharts() {
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

    var chart = c3.generate({
      bindto: '#languageChart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ],
        types: {
          data1: 'bar',
        }
      },
      axis: {
        rotated: true
      }
    });

    ///
    /// Bar Chart
    ///

    var list = this.insights.language_counts_stat;
    var arr1 = Object.keys(list).sort(function(a,b){return list[a]-list[b]})
    var arr2 = arr1.map(k => {
      return this.insights.language_counts_stat[k];
    });

    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        show: true,
        feature: {
          mark: {
            show: true,
            title: {
              mark: 'mark',
              markUndo: 'undo',
              markClear: 'clear'
            },
            lineStyle: {
              width: 2,
              color: '#1e90ff',
              type: 'dashed'
            }
          },
          dataZoom: {
            show: true,
            title: {
              zoom: 'Zoom',
              back: 'Back'
            }
          },
          dataView: {
            show: true,
            title: 'Data',
            readOnly: true,
            lang: ['Data View', 'Close', 'Refresh']
          },
          magicType: {
            show: true,
            title: {
              line: 'line',
              bar: 'bar',
              stack: 'stack',
              tiled: '平铺',
              force: '力导向布局图切换',
              chord: '和弦图切换',
              pie: 'pie',
              funnel: '漏斗图切换'
            },
            option: {
              // line: {...},
              // bar: {...},
              // stack: {...},
              // tiled: {...},
              // force: {...},
              // chord: {...},
              // pie: {...},
              // funnel: {...}
            },
            type: ['line', 'bar']
          },
          restore: {
            show: true,
            title: 'Reset'
          },
          saveAsImage: {
            show: true,
            title: 'Save',
            type: 'png',
            name: 'stage_projects_by_language'
          }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'value',
          boundaryGap: [0, 0.01]
        }
      ],
      yAxis: [
        {
          type: 'category',
          data: arr1
        }
      ],
      series: [
        {
          name: 'Projects',
          type: 'bar',
          data: arr2
        },
      ]
    });

    ///
    /// 3 radius
    ///

    var myChart2 = echarts.init(document.getElementById('main2'));
    myChart2.setOption({
      title: [{
        text: 'Reliability',
        x: '25%',
        textAlign: 'center'
      }, {
        text: 'Security',
        x: '50%',
        textAlign: 'center'
      }, {
        text: 'Maintainability',
        x: '75%',
        textAlign: 'center'
      }],
      tooltip: {
        trigger: 'axis'
      },
      radar: [
        {
          indicator: [
            {text: 'A', max: 50},
            {text: 'B', max: 50},
            {text: 'C', max: 50},
            {text: 'D', max: 50},
            {text: 'E', max: 50}
          ],
          center: ['25%','55%'],
          radius: 80
        },
        {
          indicator: [
            {text: 'A', max: 65},
            {text: 'B', max: 65},
            {text: 'C', max: 65},
            {text: 'D', max: 65},
            {text: 'E', max: 65}
          ],
          radius: 80,
          center: ['50%','55%'],
        },
        {
          indicator: [
            {text: 'A', max: 250},
            {text: 'B', max: 50},
            {text: 'C', max: 50},
            {text: 'D', max: 50},
            {text: 'E', max: 50}
          ],
          center: ['75%','55%'],
          radius: 80
        }
      ],
      series: [
        {
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          data: [
            {
              value: [50, 2, 25, 31, 14],
              name: 'Projects'
            }
          ]
        },
        {
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          radarIndex: 1,
          data: [
            {
              value: [63, 4, 32, 15, 8],
              name: 'Projects'
            }
          ]
        },
        {
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          radarIndex: 2,
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          data: [
            {
              value: [238, 4, 2, 0, 0],
              name: 'Projects'
            }
          ]
        }
      ]
    });

    // GIT HUB

    {
      var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
      var days = ['Saturday', 'Friday', 'Thursday',
        'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

      var data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
      data = data.map(function (item) {
        return [item[1], item[0], item[2]];
      });


      var myChart3 = echarts.init(document.getElementById('main3'));
      myChart3.setOption({
        title: {
          text: 'Punch Card of Github',
          link: 'https://github.com/pissang/echarts-next/graphs/punch-card'
        },
        legend: {
          data: ['Punch Card'],
          left: 'right'
        },
        tooltip: {
          position: 'top',
          formatter: function (params) {
            return params.value[2] + ' commits in ' + hours[params.value[0]] + ' of ' + days[params.value[1]];
          }
        },
        grid: {
          left: 2,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: hours,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed'
            }
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          axisLine: {
            show: false
          }
        },
        series: [{
          name: 'Punch Card',
          type: 'scatter',
          symbolSize: function (val) {
            return val[2] * 2;
          },
          data: data,
          animationDelay: function (idx) {
            return idx * 5;
          }
        }]
      });

    }

// stacked bar

    var myChart4 = echarts.init(document.getElementById('main4'));
    myChart4.setOption({
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : ['Java','Python','C','C#','C++','JavaScript','Perl']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          type:'bar',
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          type:'bar',
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          type:'bar',
          stack: '广告',
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          type:'bar',
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          type:'bar',
          data:[862, 1018, 964, 1026, 1679, 1600, 1570],
          markLine : {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data : [
              [{type : 'min'}, {type : 'max'}]
            ]
          }
        },
        {
          type:'bar',
          barWidth : 5,
          data:[620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          type:'bar',
          data:[120, 132, 101, 134, 290, 230, 220]
        },
        {
          type:'bar',
          data:[60, 72, 71, 74, 190, 130, 110]
        },
        {
          type:'bar',
          data:[62, 82, 91, 84, 109, 110, 120]
        }
      ]
    });

    // depend 1

    var myChart5 = echarts.init(document.getElementById('main5'));


      myChart5.showLoading();
    $.get('https://ecomfe.github.io/echarts-examples/public/data/asset/data/les-miserables.gexf', function (xml) {
      myChart5.hideLoading();


      var graph = echarts.dataTool.gexf.parse(xml);
      var categories = [];
      for (var i = 0; i < 9; i++) {
        categories[i] = {
          name: '类目' + i
        };
      }
      graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.value = node.symbolSize;
        node.symbolSize /= 1.5;
        node.label = {
          normal: {
            show: node.symbolSize > 30
          }
        };
        node.category = node.attributes.modularity_class;
      });

      var option = {
        title: {
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'none',
            data: graph.nodes,
            links: graph.links,
            categories: categories,
            roam: true,
            label: {
              normal: {
                show: false,
              }
            },
            lineStyle: {
              normal: {
                color: 'source',
                curveness: 0.3
              }
            }
          }
        ]
      };

      myChart5.setOption(option);
    }, 'xml');

    //depend 2

    var myChart6 = echarts.init(document.getElementById('main6'));

    myChart6.showLoading();
    $.get('https://ecomfe.github.io/echarts-examples/public/data/asset/data/les-miserables.gexf', function (xml) {
      myChart6.hideLoading();

      var graph = echarts.dataTool.gexf.parse(xml);
      var categories = [];
      for (var i = 0; i < 9; i++) {
        categories[i] = {
          name: '类目' + i
        };
      }
      graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.symbolSize = 10;
        node.value = node.symbolSize;
        node.category = node.attributes.modularity_class;
        // Use random x, y
        node.x = node.y = null;
        node.draggable = true;
      });
      var option = {
        title: {
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        animation: false,
        series : [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: graph.nodes,
            links: graph.links,
            categories: categories,
            roam: true,
            label: {
              normal: {
                position: 'right'
              }
            },
            force: {
              repulsion: 100
            }
          }
        ]
      };

      myChart6.setOption(option);
    }, 'xml');


    // 7


    var myChart7 = echarts.init(document.getElementById('main7'));
    function splitData(rawData) {
      var categoryData = [];
      var values = [];
      var volumns = [];
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        volumns.push(rawData[i][4]);
      }
      return {
        categoryData: categoryData,
        values: values,
        volumns: volumns
      };
    }

    function calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data.values[i - j][1];
        }
        result.push(+(sum / dayCount).toFixed(3));
      }
      return result;
    }

    $.get('https://ecomfe.github.io/echarts-examples/public/data/asset/data/stock-DJI.json', function (rawData) {

      var data = splitData(rawData);

      myChart7.setOption({
        backgroundColor: '#eee',
        animation: false,
        legend: {
          bottom: 10,
          left: 'center',
          data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true,
              title: {
                mark: 'mark',
                markUndo: 'undo',
                markClear: 'clear'
              },
              lineStyle: {
                width: 2,
                color: '#1e90ff',
                type: 'dashed'
              }
            },
            dataZoom: {
              show: true,
              title: {
                zoom: 'Zoom',
                back: 'Back'
              }
            },
            dataView: {
              show: true,
              title: 'Data',
              readOnly: true,
              lang: ['Data View', 'Close', 'Refresh']
            },
            magicType: {
              show: true,
              title: {
                line: 'line',
                bar: 'bar',
                stack: 'stack',
                tiled: '平铺',
                force: '力导向布局图切换',
                chord: '和弦图切换',
                pie: 'pie',
                funnel: '漏斗图切换'
              },
              option: {
                // line: {...},
                // bar: {...},
                // stack: {...},
                // tiled: {...},
                // force: {...},
                // chord: {...},
                // pie: {...},
                // funnel: {...}
              },
              type: ['line', 'bar']
            },
            restore: {
              show: true,
              title: 'Reset'
            },
            saveAsImage: {
              show: true,
              title: 'Save',
              type: 'png',
              name: 'stage_projects_by_language'
            }
          }
        },

        grid: [
          {
            left: '10%',
            right: '8%',
            height: '50%'
          },
          {
            left: '10%',
            right: '8%',
            top: '63%',
            height: '16%'
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: data.categoryData,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
          },
          {
            type: 'category',
            gridIndex: 1,
            data: data.categoryData,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
          }
        ],
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: true
            }
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 98,
            end: 100
          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '85%',
            start: 98,
            end: 100
          }
        ],
        series: [
          {
            name: 'Dow-Jones index',
            type: 'candlestick',
            data: data.values,
            itemStyle: {
              normal: {
                borderColor: null,
                borderColor0: null
              }
            },
            tooltip: {
              formatter: function (param) {
                var param = param[0];
                return [
                  'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                  'Open: ' + param.data[0] + '<br/>',
                  'Close: ' + param.data[1] + '<br/>',
                  'Lowest: ' + param.data[2] + '<br/>',
                  'Highest: ' + param.data[3] + '<br/>'
                ].join('');
              }
            }
          },
          {
            name: 'MA5',
            type: 'line',
            data: calculateMA(5, data),
            smooth: true,
            lineStyle: {
              normal: {opacity: 0.5}
            }
          },
          {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10, data),
            smooth: true,
            lineStyle: {
              normal: {opacity: 0.5}
            }
          },
          {
            name: 'MA20',
            type: 'line',
            data: calculateMA(20, data),
            smooth: true,
            lineStyle: {
              normal: {opacity: 0.5}
            }
          },
          {
            name: 'MA30',
            type: 'line',
            data: calculateMA(30, data),
            smooth: true,
            lineStyle: {
              normal: {opacity: 0.5}
            }
          },
          {
            name: 'Volumn',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data.volumns
          }
        ]
      }, true);

      // myChart.on('brushSelected', renderBrushed);

      // function renderBrushed(params) {
      //     var sum = 0;
      //     var min = Infinity;
      //     var max = -Infinity;
      //     var countBySeries = [];
      //     var brushComponent = params.brushComponents[0];

      //     var rawIndices = brushComponent.series[0].rawIndices;
      //     for (var i = 0; i < rawIndices.length; i++) {
      //         var val = data.values[rawIndices[i]][1];
      //         sum += val;
      //         min = Math.min(val, min);
      //         max = Math.max(val, max);
      //     }

      //     panel.innerHTML = [
      //         '<h3>STATISTICS:</h3>',
      //         'SUM of open: ' + (sum / rawIndices.length).toFixed(4) + '<br>',
      //         'MIN of open: ' + min.toFixed(4) + '<br>',
      //         'MAX of open: ' + max.toFixed(4) + '<br>'
      //     ].join(' ');
      // }

      myChart7.dispatchAction({
        type: 'brush',
        areas: [
          {
            brushType: 'lineX',
            coordRange: ['2016-06-02', '2016-06-20'],
            xAxisIndex: 0
          }
        ]
      });
    });
  }

  deactivate() {
    this.mostUsedLanguages.destroy();
  }

  multiArraySecondColumnDesc(a, b) {
    if (a[1] === b[1]) {
      return 0;
    }
    return (a[1] > b[1]) ? -1 : 1;
  }

}
