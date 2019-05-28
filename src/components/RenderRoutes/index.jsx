import React, { Component, PureComponent } from 'react';
import {
	HashRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import AsyncComponent from '../AsyncComponent';
import { inject, observer } from 'mobx-react';
import Error404 from '@views/Exception/404';

class RouteMiddle extends PureComponent {
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
@inject('userStore', 'layoutStore')
@observer
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
										<AsyncComponent componentInfo={component} route={route}>
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
				<Route component={Error404} />
			</Switch>
		) : null;
	}

	render() {
		const {
			layoutStore: { routeConfig }
		} = this.props;

		return <Router>{this.generateRoute(routeConfig)}</Router>;
	}
}
export default RenderRoutes;