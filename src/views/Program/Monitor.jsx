import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PopularMap from './components/PopularMap';
import MonitorList from './components/MonitorList';
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
					<Col span={12}>123</Col>
					<Col span={6}>123</Col>
					<Col span={6}>123</Col>
				</Row>
			</div>
		);
	}
}

export default Monitor;
