import React, { Component, Suspense } from 'react';
import Loading from 'components/Loading';
import Authorized from 'components/Authorized';
import { Header, Navigator } from 'components/Layout';
import { getRouteAuthority } from 'utlis/authorityTools';
import classNames from 'classnames';
import Footer from 'components/Footer';
import { observer, inject } from 'mobx-react';
import styles from './mainLayout.module.scss';

/**
 * 主结构组件
 * 由：
 * loading
 * navigate 侧边栏
 * header 顶部栏
 * 组成
 * 被 Authorized 组件包裹，做权限判断
 */
const Exception403 = React.lazy(() =>
	import(/* webpackChunkName: "403" */ 'views/Exception/403')
);

@inject('layoutStore')
@observer
class MainLayout extends Component {
	render() {
		const {
			layoutStore: { collapsed, isMobile, toggleCollapsed, spinning, fixed },
			children,
			location,
			route
		} = this.props;
		const routeAuthority = getRouteAuthority(location.pathname, route.routes);
		return (
			<Authorized
				unidentified={<div>123</div>}
			>
				<div className={styles.container}>
					<Loading
						spinning={spinning}
						fixed={fixed}
						collapsed={collapsed}
					/>
					<Navigator
						collapsed={collapsed}
						isMobile={isMobile}
						toggleCollapsed={toggleCollapsed}
						location={location}
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
