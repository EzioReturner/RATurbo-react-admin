import React, { Component, Suspense } from 'react';
import Loading from '@components/Loading';
import Authorized from '@components/Authorized';
import { Header, Navigator } from '@components/Layout';
import { Redirect, withRouter } from 'react-router-dom';
import { getRouteAuthority } from '@utlis/authorityTools';
import classNames from 'classnames';
import Footer from '@components/Footer';
import { observer, inject } from 'mobx-react';
import styles from './mainLayout.module.scss';

const Exception403 = React.lazy(() =>
	import(/* webpackChunkName: "403" */ '@views/Exception/403')
);

@withRouter
@inject('layoutStore')
@observer
class MainLayout extends Component {
	render() {
		const {
			layoutStore: { collapsed, isMobile, toggleCollapsed, spinning, fixed },
			children,
			location: { pathname },
			route
		} = this.props;
		const routeAuthority = getRouteAuthority(pathname, route.routes);
		return (
			<Authorized
				unidentified={<Redirect to="/user/login" />}
			>
				<div className={styles.container}>
					<Loading spinning={spinning} fixed={fixed} />
					<Navigator
						collapsed={collapsed}
						isMobile={isMobile}
						toggleCollapsed={toggleCollapsed}
					/>
					<div
						id="mainContainer"
						className={classNames(
							styles.routeContent,
							collapsed ? styles.collapsed : '',
							isMobile ? styles.isMobile : ''
						)}
					>
						<Header />
						<Authorized
							routeAuthority={routeAuthority}
							unidentified={
								<Suspense fallback={<Loading />}>
									<Exception403 />
								</Suspense>
							}
						>
							<div className={styles.viewBody}>{children}</div>
						</Authorized>
						<Footer />
					</div>
				</div>
			</Authorized>
		);
	}
}

export default MainLayout;
