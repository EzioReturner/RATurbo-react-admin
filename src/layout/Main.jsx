import React, { Component } from 'react';
import Navigator from './Navigator';
import RoutesComponent from './RouteContent';
import Loading from '@components/Loading/Index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Store } from '@store/index';
import './main.scss';

@inject('layoutStore')
@observer
class Main extends Component {
	render() {
		const { mountLoading, collapsed } = this.props.layoutStore;
		return (
			<Router>
				<div className="container">
					{mountLoading && <Loading />}
					<Navigator collapsed={collapsed} />
					<RoutesComponent collapsed={collapsed} />
				</div>
			</Router>
		);
	}
}

export default Main;
