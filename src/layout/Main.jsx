import React, { Component } from 'react';
import Navigator from './Navigator';
import RoutesComponent from './RouteContent';
import Loading from '@components/Loading/Index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { observer, Provider } from 'mobx-react';
import mainStore from './model';
import './main.scss';

@observer
class Main extends Component {
	render() {
		const {
			spinning,
			fixed,
			mountLoading,
			collapsed,
			toggleCollapsed
		} = mainStore;
		return (
			<Router>
				<Provider mainStore={mainStore}>
					<div className="container">
						{mountLoading && <Loading spinning={spinning} fixed={fixed} />}
						<Navigator collapsed={collapsed} />
						<RoutesComponent
							collapsed={collapsed}
							toggleCollapsed={toggleCollapsed}
						/>
					</div>
				</Provider>
			</Router>
		);
	}
}

export default Main;
