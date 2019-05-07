import React, { Component } from 'react';
import ControllerCard from './ControllerCard';
import DistributeCard from './DistributeCard';
import './analysis.scss';

class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="analysis">
				<ControllerCard />
				<DistributeCard />
			</div>
		);
	}
}

export default Dashboard;
