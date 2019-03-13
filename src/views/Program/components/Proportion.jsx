import React, { Component } from 'react';
import { Card } from 'antd';
import EchartsReact from '@components/Echarts/Index';
import { getWordCloud } from '@api/analysis';
import { wordCloudChart } from '@assets/chartOption';

class Proportion extends Component {
	state = {
		data: wordCloudChart()
	};
	componentDidMount() {
		this.loadData();
	}

	async loadData() {
		const data = await getWordCloud();
		const option = wordCloudChart(data.data.data);
		this.setState({
			data: option
		});
	}

	render() {
		const { data } = this.state;
		return (
			<Card
				hoverable
				bordered={false}
				title="trading proportion"
				className="fat-card"
			>
				<EchartsReact option={data} style={{ height: '200px' }} />
			</Card>
		);
	}
}

export default Proportion;
