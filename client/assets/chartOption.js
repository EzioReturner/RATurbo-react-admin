const circleOption = {
  legend: {
    orient: 'vertical',
    right: 20,
    data: [
      {
        name: '男',
        icon: 'circle'
      },
      {
        name: '女',
        icon: 'circle'
      },
      {
        name: '未识别',
        icon: 'circle'
      }
    ]
  },
  series: {
    name: '访问来源',
    type: 'pie',
    radius: ['40%', '75%'],
    center: ['45%', '50%'],
    avoidLabelOverlap: false,
    label: {
      normal: {
        show: true,
        position: 'outside',
        formatter: '{d}%',
        fontWeight: 'bold'
      },
      emphasis: {
        show: true,
        textStyle: {
          fontSize: '30',
          fontWeight: 'bold'
        }
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    },
    data: [
      {
        value: 335,
        name: '男',
        itemStyle: {
          color: 'rgba(251, 68, 145, 0.8)'
        }
      },
      {
        value: 310,
        name: '女',
        itemStyle: {
          color: 'rgba(220, 91, 231, 0.8)'
        }
      },
      {
        value: 234,
        name: '未识别',
        itemStyle: {
          color: '#d9d9d9'
        }
      }
    ]
  }
};

const barOption = {
  grid: {
    left: 10,
    right: 10,
    top: 40,
    bottom: 40
  },
  xAxis: {
    type: 'category',
    data: ['未识别', '0-17', '18-24', '25-34', '35-44', '45+'],
    axisLabel: {
      color: '#c9c9c9'
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#f6f6f6'
      }
    }
  },
  series: [
    {
      barCategoryGap: '50%',
      data: [
        {
          value: 45,
          itemStyle: {
            color: '#d9d9d9'
          }
        },
        4.2,
        22.5,
        22.3,
        '8.00',
        2.53
      ],
      type: 'bar',
      label: {
        show: true,
        position: 'top',
        color: '#c9c9c9',
        formatter: '{c}%'
      },
      itemStyle: {
        color: 'rgba(251, 68, 145, 0.8)'
      },
      z: 2
    },
    {
      type: 'bar',
      silent: true,
      data: [45, 45, 45, 45, 45, 45],
      barGap: '-100%',
      itemStyle: {
        color: '#f9f9f9'
      },
      z: 1
    }
  ]
};

const cityOption = {
  xAxis: {
    data: ['未识别', '上海', '北京', '深圳', '广州', '杭州']
  },
  series: {
    data: [
      {
        name: '未识别',
        value: 45,
        itemStyle: {
          color: '#d9d9d9'
        }
      },
      14.2,
      2.5,
      7.3,
      '19.00',
      33.53
    ]
  }
};

const provinceOption = {
  xAxis: {
    data: ['未识别', '四川', '福建', '广东', '浙江', '河南']
  },
  series: {
    data: [
      {
        name: '未识别',
        value: 45,
        itemStyle: {
          color: '#d9d9d9'
        }
      },
      18.2,
      22.5,
      33.3,
      '9.00',
      13.53
    ]
  }
};

const lineOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['未识别', '邮件营销', '视频广告', '直接访问', '搜索引擎']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#efefef'
      }
    },
    axisLabel: {
      color: 'rgba(0,0,0,0.7)',
      fontWeight: 'bold'
    },
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: [
    {
      axisLabel: {
        color: 'rgba(0,0,0,0.7)',
        fontWeight: 'bold'
      },
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#efefef',
          type: 'dashed'
        }
      }
    }
  ],
  series: [
    {
      name: '未识别',
      type: 'line',
      smooth: true,
      data: [520, 682, 534, 534, 390, 820, 410],
      lineStyle: {
        color: '#efefef'
      },
      areaStyle: {
        color: 'rgba(239,239,239,0.7)'
      },
      itemStyle: {
        color: '#efefef'
      }
    },
    {
      name: '邮件营销',
      type: 'line',
      smooth: true,
      lineStyle: {
        color: 'rgba(220, 91, 231, 0.4)'
      },
      areaStyle: {
        color: 'rgba(220, 91, 231, 0.4)'
      },
      itemStyle: {
        color: 'rgba(220, 91, 231, 0.4)'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '搜索引擎',
      type: 'line',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      smooth: true,
      lineStyle: {
        color: 'rgb(251, 68, 145,0.9)'
      },
      areaStyle: {
        color: 'rgba(251, 68, 145, 0.3)'
      },
      itemStyle: {
        color: 'rgba(251, 68, 145, 1)'
      },
      data: [820, 432, 901, 234, 790, 630, 820]
    }
  ]
};

export const globalTrendsOption = {
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '0%',
    right: '1%',
    bottom: '0%',
    top: '0%',
    containLabel: true
  },
  xAxis: [
    {
      show: false,
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  ],
  yAxis: [
    {
      show: false,
      type: 'value'
    }
  ],
  series: [
    {
      smooth: true,
      name: '邮件营销',
      type: 'line',
      lineStyle: {
        color: '#c6f0fd'
      },
      itemStyle: {
        color: '#c6f0fd'
      },
      areaStyle: {
        color: '#c6f0fd'
      },
      data: [0, 132, 21, 184, 90, 230, 0]
    },
    {
      smooth: true,
      name: '联盟广告',
      type: 'line',
      lineStyle: {
        color: '#8ac3e8'
      },
      itemStyle: {
        color: '#8ac3e8'
      },
      areaStyle: {
        color: '#8ac3e8'
      },
      data: [0, 182, 191, 34, 290, 30, 0]
    },
    {
      smooth: true,
      name: '视频广告',
      type: 'line',
      lineStyle: {
        color: '#6bb3e5'
      },
      itemStyle: {
        color: '#6bb3e5'
      },
      areaStyle: {
        color: '#6bb3e5'
      },
      data: [0, 232, 121, 154, 190, 330, 0]
    }
  ]
};

export function popularOption(mapData, topData) {
  require('echarts/extension/bmap/bmap');
  return {
    tooltip: {
      trigger: 'item'
    },
    bmap: {
      center: [104.114129, 37.550339],
      zoom: 5,
      roam: true,
      disableDragging: true,
      mapStyle: {
        styleJson: [
          {
            featureType: 'water',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1'
            }
          },
          {
            featureType: 'land',
            elementType: 'all',
            stylers: {
              color: '#f3f3f3'
            }
          },
          {
            featureType: 'railway',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'highway',
            elementType: 'all',
            stylers: {
              color: '#fdfdfd'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry',
            stylers: {
              color: '#fefefe'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.fill',
            stylers: {
              color: '#fefefe'
            }
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'green',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'subway',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1'
            }
          },
          {
            featureType: 'local',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'boundary',
            elementType: 'all',
            stylers: {
              color: '#fefefe'
            }
          },
          {
            featureType: 'building',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1'
            }
          },
          {
            featureType: 'label',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#999999'
            }
          }
        ]
      }
    },
    series: [
      {
        name: 'pm2.5',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: mapData,
        symbolSize: function(val) {
          return val[2] / 10;
        },
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: 'rgba(251, 68, 145, 0.6)'
          }
        }
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: topData,
        symbolSize: function(val) {
          return val[2] / 10;
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: 'rgba(251, 68, 145, 0.8)',
            shadowBlur: 10,
            shadowColor: 'rgb(251, 68, 145)'
          }
        },
        zlevel: 1
      }
    ]
  };
}

export const monitorListOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: 0,
    data: ['2011', '2012']
  },
  grid: {
    left: '0%',
    right: '4%',
    bottom: '3%',
    top: '8%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['Brasil', 'Indonesia', 'America', 'Indian', 'China', 'world sales']
  },
  series: [
    {
      name: '2011',
      type: 'bar',
      barWidth: 10,
      data: [182, 234, 290, 1049, 1317, 6302],
      itemStyle: {
        color: 'rgba(251, 68, 145, 0.8)'
      }
    },
    {
      name: '2012',
      type: 'bar',
      barWidth: 10,
      data: [193, 234, 310, 1215, 1341, 6818],
      itemStyle: {
        color: '#e3e3e3'
      }
    }
  ]
};

export function wordCloudChart(data = []) {
  require('echarts-wordcloud');
  const colors = [
    'rgb(218,112,214)',
    'rgb(199,21,133)',
    'rgb(255,20,147)',
    'rgb(255,105,180)',
    'rgb(219,112,147)',
    'rgb(255,240,245)',
    'rgb(220,20,60)',
    'rgb(255,192,203)',
    'rgb(255,182,193)',
    'rgb(255,0,255)'
  ];
  function createRandomItemStyle() {
    const index = Math.floor(Math.random() * -9 + 10);
    return {
      normal: {
        color: colors[index]
      }
    };
  }
  return {
    tooltip: {
      show: true
    },
    series: [
      {
        name: 'Google Trends',
        type: 'wordCloud',
        left: 'center',
        top: 'center',
        width: '90%',
        height: '90%',
        textRotation: [0, 45, 90, -45],
        textPadding: 0,
        autoSize: {
          enable: true,
          minSize: 14
        },
        data: data.map(res => {
          return {
            name: res,
            value: Math.floor(Math.random() * 100),
            textStyle: createRandomItemStyle()
          };
        })
      }
    ]
  };
}

export const gaugeOption = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      radius: '100%',
      name: 'gauge',
      type: 'gauge',
      axisLine: {
        lineStyle: {
          color: [[0.09, '#e3e3e3'], [0.82, '#fb4491'], [1, '#71669e']],
          width: 3,
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        }
      },
      axisLabel: {
        // 坐标轴小标记
        textStyle: {
          // 属性lineStyle控制线条样式
          fontWeight: 'bolder',
          color: '#fff',
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        }
      },
      axisTick: {
        // 坐标轴小标记
        length: 15, // 属性length控制线长
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: 'auto',
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        }
      },
      splitLine: {
        // 分隔线
        length: 25, // 属性length控制线长
        lineStyle: {
          // 属性lineStyle（详见lineStyle）控制线条样式
          width: 3,
          color: '#fff',
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        }
      },
      pointer: {
        // 分隔线
        shadowColor: '#fff', //默认透明
        shadowBlur: 5
      },
      title: {
        textStyle: {
          fontWeight: 'bolder',
          fontSize: 20,
          fontStyle: 'italic',
          color: '#e3e3e3'
        }
      },
      detail: {
        offsetCenter: [0, '50%'], // x, y，单位px
        textStyle: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          color: '#fb4491',
          fontSize: 20
        }
      },
      data: [{ value: 70.2, name: 'efficiency' }]
    }
  ]
};

export const multiAnalysisOption = {
  tooltip: {},
  legend: {
    left: 0,
    width: 80,
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    radius: '75%',
    name: {
      textStyle: {
        color: '#fff',
        backgroundColor: '#999',
        borderRadius: 3,
        padding: [3, 5]
      }
    },
    indicator: [
      { name: 'sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Techology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // areaStyle: {normal: {}},
      data: [
        {
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: 'Allocated Budget',
          itemStyle: {
            color: '#fb4491'
          }
        },
        {
          value: [5000, 14000, 28000, 31000, 42000, 21000],
          name: 'Actual Spending',
          itemStyle: {
            color: '#71669e'
          }
        }
      ]
    }
  ]
};

export const analysisOptions = {
  circleOption,
  barOption,
  cityOption,
  provinceOption,
  lineOption
};
