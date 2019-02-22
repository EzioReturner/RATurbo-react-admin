import React, { Component, Suspense } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import routeConfig from '../../config/router.config';

class RouteComponent extends Component {
	constructor(props) {
		super(props);
	}

	generateRoute(route) {
		const { path, component: Component, children } = route;
		if (children) {
			return children.map(res => this.generateRoute(res));
		} else {
			return (
				<Route
					exact
					path={path}
					key={path}
					render={props => <Component {...Object.assign(props, this.props)} />}
				/>
			);
		}
	}

	render() {
		const routes = routeConfig[1].routes;
		return routes.reduce((total, route) => {
			const { redirect, path, component, children } = route;
			const C = redirect ? (
				<Route
					path="/"
					exact
					key={path}
					render={() => <Redirect to={redirect} />}
				/>
			) : (
				this.generateRoute(route)
			);
			return Array.isArray(C) ? [...total, ...C] : [...total, C];
		}, []);
	}
}

@withRouter
class RouteList extends Component {
	render() {
		return (
			<Switch>
				<RouteComponent {...this.props} />
			</Switch>
		);
	}
}
export default RouteList;
