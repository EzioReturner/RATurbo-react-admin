import React, { Component, Suspense } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import '@style/layout/routeContent.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import routeConfig from '../config/router.config';

class RouteComponent extends Component {
	generateRoute(route) {
		const { path, component, children } = route;
		if (children) {
			return children.map(res => this.generateRoute(res));
		} else {
			return <Route exact path={path} key={path} component={component} />;
		}
	}

	render() {
		return routeConfig.reduce((total, route) => {
			const { redirect, path, component, children } = route;
			const C = this.generateRoute(route);
			return Array.isArray(C) ? [...total, ...C] : [...total, C];
		}, []);
	}
}

class RouteList extends Component {
	render() {
		const { location } = this.props;
		return (
			<div className="routeContent">
				<TransitionGroup>
					<CSSTransition
						classNames="fade"
						timeout={800}
						key={location.pathname}
					>
						<Switch location={location}>
							<RouteComponent />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			</div>
		);
	}
}
export default RouteList;
