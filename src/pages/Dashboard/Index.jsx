import React, { Component } from 'react';
import { Card } from 'antd';
import RowInfoCard from './components/RowInfoCard';
import './dashboard.scss';

class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="dashboard">
				<RowInfoCard />
			</div>
		);
	}
}

export default Dashboard;
