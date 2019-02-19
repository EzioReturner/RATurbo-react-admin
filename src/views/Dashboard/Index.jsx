import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import RowInfoCard from './components/RowInfoCard';
import Weather from './components/Weather';
import Performance from './components/Performance';
import SaleTable from './components/SaleTable';
import GlobalTrends from './components/GlobalTrends';
import './dashboard.scss';

class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="dashboard">
				<RowInfoCard />
				<Row
					gutter={24}
					style={{
						margin: '24px -12px'
					}}
				>
					<Col span={14}>
						<Weather />
					</Col>
					<Col span={10}>
						<Performance />
					</Col>
				</Row>
				<Row
					style={{
						margin: '24px 0'
					}}
				>
					<Col span={24}>
						<GlobalTrends />
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<SaleTable />
					</Col>
				</Row>
			</div>
		);
	}
}

export default Dashboard;
