import React, { Component } from 'react';
import ControllerCard from './components/ControllerCard';
import DistributeCard from './components/DistributeCard';
import { observer } from 'mobx-react';
import dashboardState from './model';
import './analysis.scss';

class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="content">
				<ControllerCard store={dashboardState} />
				<DistributeCard store={dashboardState} />
			</div>
		);
	}
}

export default Dashboard;
