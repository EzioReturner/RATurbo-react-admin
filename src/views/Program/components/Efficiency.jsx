import React, { Component } from 'react';
import { Card } from 'antd';
import ET from '@utlis/echartTools';
import { guageOption } from '@utlis/chartOption';

class Efficiency extends Component {
	componentDidMount() {
		ET.initChart({ id: 'guageChart', option: guageOption });
	}
	render() {
		return (
			<Card className="fat-card" title="Guage">
				<div id="guageChart" />
			</Card>
		);
	}
}

export default Efficiency;
