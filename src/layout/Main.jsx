import React, { Component } from 'react';
import Header from './Header';
import Navigator from './Navigator';
import RoutesComponent from './RouteContent';
import Loading from '@components/Loading/Index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import mainState from './model';
import './main.scss';

@observer
class Main extends Component {
	render() {
		const { spinning, fixed } = mainState;
		return (
			<Router>
				<Route
					render={({ location }) => (
						<div className="container">
							{spinning && <Loading spinning={spinning} fixed={fixed} />}
							<Header />
							<Navigator location={location} />
							<RoutesComponent location={location} store={mainState} />
						</div>
					)}
				/>
			</Router>
		);
	}
}

export default Main;
