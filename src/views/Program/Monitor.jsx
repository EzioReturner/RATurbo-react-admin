import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PopularMap from './components/PopularMap';
import MonitorList from './components/MonitorList';
import Proportion from './components/Proportion';
import Efficiency from './components/Efficiency';
import Surplus from './components/Surplus';
import './monitor.scss';

class Monitor extends Component {
	render() {
		return (
			<div className="monitor">
				<Row gutter={24} style={{ marginBottom: '24px' }}>
					<Col span={16}>
						<PopularMap />
					</Col>
					<Col span={8}>
						<MonitorList />
					</Col>
				</Row>
				<Row gutter={24}>
					<Col span={12}>
						<Proportion />
					</Col>
					<Col span={6}>
						<Efficiency />
					</Col>
					<Col span={6}>
						<Surplus />
					</Col>
				</Row>
			</div>
		);
	}
}

export default Monitor;
