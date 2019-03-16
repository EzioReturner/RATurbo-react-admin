import React, { Component, Suspense } from 'react';
import Loading from '@components/Loading/Index';
import Authorized from '@components/Authorized/Index';
import { Header, Navigator } from '@components/Layout/Index';
import { Redirect, withRouter } from 'react-router-dom';
import { getRouteAuthority } from '@utlis/authorityTools';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import styles from './mainLayout.module.scss';

const Exception403 = React.lazy(() =>
	import(/* webpackChunkName: "403" */ '@views/Exception/403')
);

@withRouter
@inject('layoutStore')
@observer
class MainLayout extends Component {
	componentDidMount() {}

	render() {
		const {
			layoutStore: { mountLoading, collapsed, isMobile, toggleCollapsed },
			children,
			location: { pathname }
		} = this.props;
		const routeAuthority = getRouteAuthority(pathname);
		return (
			<Authorized
				routeAuthority={['admin', 'guest']}
				unidentified={<Redirect to="/user/login" />}
			>
				<div className={styles.container}>
					<Loading />
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
					</div>
				</div>
			</Authorized>
		);
	}
}

export default MainLayout;
