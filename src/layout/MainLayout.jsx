import React, { Component, Suspense } from 'react';
import Navigator from './Navigator';
import Loading from '@components/Loading/Index';
import Header from './Header';
import Authorized from '@components/Authorized/Index';
import { Redirect, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import './mainLayout.scss';
import routeConfig from '../config/router.config';

const NotAllowed = React.lazy(() =>
	import(/* webpackChunkName: "403" */ '@components/Exception/403')
);

const _routes = routeConfig[1].routes;
@withRouter
@inject('layoutStore')
@observer
class MainLayout extends Component {
	getRouteAuthority(pathname) {
		let routeAuthority = null;
		const getAuthority = (pathname, routes) => {
			routes.forEach(route => {
				if (pathname === route.path) {
					routeAuthority = route.authority;
				} else if (route.routes) {
					routeAuthority = getAuthority(pathname, route.routes);
				}
			});
			return routeAuthority;
		};
		return getAuthority(pathname, _routes);
	}

	render() {
		const {
			layoutStore: { mountLoading, collapsed },
			children,
			location: { pathname }
		} = this.props;
		const routeAuthority = this.getRouteAuthority(pathname);
		return (
			<Authorized
				routeAuthority={['admin', 'guest']}
				unidentified={<Redirect to="/user/login" />}
			>
				<div className="container">
					{mountLoading && <Loading />}
					<Navigator collapsed={collapsed} />
					<div
						id="mainContainer"
						className={classNames('routeContent', {
							collapsed: collapsed
						})}
					>
						<Header />
						<Authorized
							routeAuthority={routeAuthority}
							unidentified={
								<Suspense fallback={<Loading />}>
									<NotAllowed />
								</Suspense>
							}
						>
							{children}
						</Authorized>
					</div>
				</div>
			</Authorized>
		);
	}
}

export default MainLayout;
