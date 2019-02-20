import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { initChart } from '@utlis/echartTools';

class GlobalTrends extends PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.createChart();
	}

	async createChart() {
		const {
			globalTrendsOption
		} = await import(/* webpackChunkName: "globalTrendsOption" */ '@utlis/chartOption');
		initChart({ id: 'chartContaniner', option: globalTrendsOption });
	}

	render() {
		return (
			<Card
				bordered={false}
				className="fat-card global-trends"
				title="Global Trends"
			>
				<div id="chartContaniner" />
			</Card>
		);
	}
}

export default GlobalTrends;
