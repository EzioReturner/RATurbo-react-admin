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
				<Row gutter={24}>
					<Col xl={14} lg={14} md={24} sm={24} xs={24}>
						<Weather />
					</Col>
					<Col xl={10} lg={10} md={24} sm={24} xs={24}>
						<Performance />
					</Col>
				</Row>
				<Row>
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
