import React, { Component, Suspense } from 'react';
import Loading from '@components/Loading/Index';
import Authorized from '@components/Authorized/Index';
import { Header, Navigator } from '@components/Layout/Index';
import { Redirect, withRouter } from 'react-router-dom';
import { getRouteAuthority } from '@utlis/authorityTools';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import debounce from '@utlis/debounce';
import './mainLayout.scss';

const Exception403 = React.lazy(() =>
	import(/* webpackChunkName: "403" */ '@views/Exception/403')
);

@withRouter
@inject('layoutStore')
@observer
class MainLayout extends Component {
	componentDidMount() {
		window.addEventListener(
			'resize',
			debounce(e => {
				if (document.body.clientWidth < 1000) {
					this.props.layoutStore.toggleCollapsed(true);
				} else {
					this.props.layoutStore.toggleCollapsed(false);
				}
			})
		);
	}

	render() {
		const {
			layoutStore: { mountLoading, collapsed },
			children,
			location: { pathname }
		} = this.props;
		const routeAuthority = getRouteAuthority(pathname);
		return (
			<Authorized
				routeAuthority={['admin', 'guest']}
				unidentified={<Redirect to="/user/login" />}
			>
				<div className="container">
					<Loading />
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
									<Exception403 />
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
