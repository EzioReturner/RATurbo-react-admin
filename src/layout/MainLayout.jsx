import React, { Component } from 'react';
import Navigator from './Navigator';
import RenderRoutes from '@components/RenderRoutes/Index';
import Loading from '@components/Loading/Index';
import Header from './Header';
// import { HashRouter as Router } from 'react-router-dom';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { Store } from '@store/index';
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
		);
	}
}

export default MainLayout;
