import React, { Component } from 'react';
import { Card } from 'antd';
import ET from '@utlis/echartTools';
import { popularOption } from '@assets/chartOption';

class PopularMap extends Component {
	componentDidMount() {
		this.initChart();
	}

	async initChart() {
		const { mapData, topData } = await import('@assets/popular');
		const option = popularOption(mapData, topData);
		ET.initChart({ id: 'poplar-map', option });
	}

	componentWillUnmount() {
		ET.dispose('poplar-map');
	}

	render() {
		return (
			<Card
				hoverable
				bordered={false}
				className="fat-card poplar-map-card"
				title="Real-time Trading"
			>
				<div id="poplar-map" />
			</Card>
		);
	}
}

export default PopularMap;
