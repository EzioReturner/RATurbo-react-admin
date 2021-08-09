import React, { Component } from 'react';
import { bind, clear } from 'size-sensor';
import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  ScatterChart,
  GaugeChart,
  EffectScatterChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  ScatterChart,
  GaugeChart,
  EffectScatterChart,
  CanvasRenderer,
  LegendComponent,
  DatasetComponent
]);

interface EchartProps {
  option: StoreKeyValue[] | StoreKeyValue;
  theme?: string;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

class EchartsReact extends Component<EchartProps> {
  public echartsDOM: any;

  initChart() {
    const chartObj = this.renderChart();
    bind(this.echartsDOM, () => {
      chartObj.resize();
    });
  }

  componentDidUpdate() {
    this.renderChart();
  }

  getInstance() {
    const { theme } = this.props;
    return (
      echarts.getInstanceByDom(this.echartsDOM) ||
      echarts.init(this.echartsDOM, theme)
    );
  }

  componentDidMount() {
    this.initChart();
  }

  componentWillUnmount() {
    this.dispose();
  }

  dispose() {
    clear(this.echartsDOM);
    this.echartsDOM && echarts.dispose(this.echartsDOM);
  }

  renderChart() {
    const chartObj = this.getInstance();
    let { option } = this.props;
    const { notMerge, lazyUpdate } = this.props;
    const _option: StoreKeyValue[] = Array.isArray(option) ? option : [option];
    _option.forEach(op =>
      chartObj.setOption(op || {}, notMerge || false, lazyUpdate || false)
    );
    // chartObj.setOption(_option[0] || {}, notMerge || false, lazyUpdate || false);
    // _option[1] && chartObj.setOption(_option[1]);
    return chartObj;
  }

  render() {
    const { style, className } = this.props;
    const domStyle = {
      height: '300px',
      ...style
    };
    return (
      <div
        style={domStyle}
        className={`echarts-react ${className || ''}`}
        ref={e => {
          this.echartsDOM = e;
        }}
      />
    );
  }
}

export default EchartsReact;
