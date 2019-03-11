import React, { PureComponent } from 'react';
import { Card } from 'antd';
import ET from '@utlis/echartTools';

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
		} = await import(/* webpackChunkName: "globalTrendsOption" */ '@assets/chartOption');
		ET.initChart({ id: 'chartContaniner', option: globalTrendsOption });
	}

	componentWillUnmount() {
		ET.dispose('chartContaniner');
	}

	render() {
		return (
			<Card
				hoverable
				bordered={false}
				className="fat-card global-trends"
				bodyStyle={{ overflow: 'hidden' }}
				title="Global Trends"
			>
				<div id="chartContaniner" />
			</Card>
		);
	}
}

export default GlobalTrends;
