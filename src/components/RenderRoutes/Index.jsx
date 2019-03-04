import React, { Component, Fragment } from 'react';
import {
	HashRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import routeConfig from '../../config/router.config';
import { inject } from 'mobx-react';
import Error from '@views/Exception/404';
// function authorityRoute(route) {
// 	const authorityRoute = args => {
// 		const { render, ...rest } = args;
// 		return (
// 			<Authorized>
// 				<RouteMiddle
// 					{...rest}
// 					render={props => {
// 						return <route.component {...props} route={route} render={render} />;
// 					}}
// 				/>
// 			</Authorized>
// 		);
// 	};
// 	return authorityRoute;
// }

class RouteMiddle extends Component {
	render() {
		const { path, exact, strict, render, location, ...rest } = this.props;
		return (
			<Route
				path={path}
				exact={exact}
				strict={strict}
				location={location}
				render={props => render({ ...props, ...rest })}
			/>
		);
	}
}

@inject('userStore')
class RenderRoutes extends Component {
	generateRoute(routes, switchProps) {
		return routes ? (
			<Switch {...switchProps}>
				{routes.map((route, i) => {
					const {
						redirect,
						path,
						exact,
						strict,
						routes,
						component: C,
						key,
						withAuthority,
						authority
					} = route;
					if (redirect) {
						return (
							<Redirect
								key={key || i}
								from={path}
								to={redirect}
								exact={exact}
								strict={strict}
							/>
						);
					}
					return (
						<RouteMiddle
							key={i}
							path={path}
							exact={exact}
							strict={strict}
							render={props => {
								const childRoutes = this.generateRoute(routes, {
									location: props.location
								});
								if (C) {
									return <C>{childRoutes}</C>;
								} else {
									return childRoutes;
								}
							}}
						/>
					);
				})}
				<Route component={Error} />
			</Switch>
		) : null;
	}

	render() {
		const { location } = this.props;
		const routes = routeConfig;
		return <Router>{this.generateRoute(routes)}</Router>;
	}
}
export default RenderRoutes;
