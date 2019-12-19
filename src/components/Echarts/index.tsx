import React, { Component } from 'react';
import echarts from './lib';
import { bind, clear } from 'size-sensor';

interface EchartProps {
  option: object[] | object;
  theme?: string;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  style?: object;
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
    const { option, theme } = this.props;

    return (
      echarts.getInstanceByDom(this.echartsDOM) || echarts.init(this.echartsDOM, theme, option)
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
    const _option: Object[] = Array.isArray(option) ? option : [option];
    chartObj.setOption(_option[0] || {}, notMerge || false, lazyUpdate || false);
    _option[1] && chartObj.setOption(_option[1]);
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
