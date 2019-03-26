import React, { Component } from 'react';
import { Card } from 'antd';
import { monitorListOption } from '@assets/chartOption';
import EchartsReact from '@components/Echarts';

class MonitorList extends Component {
	render() {
		return (
			<Card
				title="world trading rank"
				className="fat-card monitor-list-card"
				bordered={false}
				hoverable
			>
				<EchartsReact style={{ height: '490px' }} option={monitorListOption} />
			</Card>
		);
	}
}

export default MonitorList;
