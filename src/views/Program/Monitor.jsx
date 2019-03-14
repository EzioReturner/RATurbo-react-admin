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
				<Row gutter={24}>
					<Col xl={16} lg={24} md={24} sm={24} xs={24}>
						<PopularMap />
					</Col>
					<Col xl={8} lg={24} md={24} sm={24} xs={24}>
						<MonitorList />
					</Col>
				</Row>
				<Row gutter={24}>
					<Col xl={12} lg={8} md={24} sm={24} xs={24}>
						<Proportion />
					</Col>
					<Col xl={6} lg={8} md={24} sm={24} xs={24}>
						<Efficiency />
					</Col>
					<Col xl={6} lg={8} md={24} sm={24} xs={24}>
						<Surplus />
					</Col>
				</Row>
			</div>
		);
	}
}

export default Monitor;
