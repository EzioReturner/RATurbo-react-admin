import React, { Component, Fragment } from 'react';
import {
	HashRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import AsyncComponent from '@components/AsyncComponent/Index';
import routeConfig from '../../config/router.config';
import { inject } from 'mobx-react';
import Error from '@views/Exception/404';

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

/**
 * 路由生成组件
 * 遍历路由表 生成多级路由
 */
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
						component,
						key,
						withAuthority,
						authority,
						name
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
								if (component) {
									return (
										<AsyncComponent componentInfo={component} path={path}>
											{childRoutes}
										</AsyncComponent>
									);
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
