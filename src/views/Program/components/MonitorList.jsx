import React, { Component } from 'react';
import { Card } from 'antd';
import { monitorListOption } from '@utlis/chartOption';
import ET from '@utlis/echartTools';

class MonitorList extends Component {
	componentDidMount() {
		ET.initChart({ id: 'list-bar', option: monitorListOption });
	}

	render() {
		return (
			<Card
				title="world trading rank"
				className="fat-card monitor-list-card"
				bordered={false}
				hoverable
			>
				<div id="list-bar" />
			</Card>
		);
	}
}

export default MonitorList;
