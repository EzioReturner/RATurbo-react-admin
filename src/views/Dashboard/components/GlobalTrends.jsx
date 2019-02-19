import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { globalTrendsOption } from '@utlis/chartOption';
import { initChart } from '@utlis/echartTools';

class GlobalTrends extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	componentDidMount() {
		this.loadChartData();
		this.createChart();
	}

	loadChartData = async () => {
		const data = await import('@assets/global-trends.json');
	};

	createChart() {
		initChart({ id: 'chartContaniner', option: globalTrendsOption });
	}

	render() {
		let { data } = this.state;

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
