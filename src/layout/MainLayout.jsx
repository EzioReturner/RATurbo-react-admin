import React, { Component } from 'react';
import Navigator from './Navigator';
import Loading from '@components/Loading/Index';
import Header from './Header';
import Authorized from '@components/Authorized/Index';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import './mainLayout.scss';

@inject('layoutStore')
@observer
class MainLayout extends Component {
	render() {
		const {
			layoutStore: { mountLoading, collapsed },
			children
		} = this.props;
		return (
			<Authorized
				routeAuthority="all"
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
						{children}
					</div>
				</div>
			</Authorized>
		);
	}
}

export default MainLayout;
