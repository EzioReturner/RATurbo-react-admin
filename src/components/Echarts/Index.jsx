import React, { Component } from 'react';
import echarts from 'echarts';
import { bind, clear } from 'size-sensor';

class EchartsReact extends Component {
	constructor(props) {
		super(props);
		this.echartsDOM = null; // echarts div element
	}

	renderChart() {
		const chartObj = this.getInstance();
		const { option, notMerge, lazyUpdate } = this.props;
		chartObj.setOption(option || {}, notMerge || false, lazyUpdate || false);
		return chartObj;
	}

	initChart() {
		const chartObj = this.renderChart();
		bind(this.echartsDOM, () => {
			chartObj.resize();
		});
	}

	componentDidUpdate() {
		this.renderChart();
	}

	getInstance(id) {
		const { opts, theme } = this.props;
		return (
			echarts.getInstanceByDom(this.echartsDOM) ||
			echarts.init(this.echartsDOM, theme, opts)
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
