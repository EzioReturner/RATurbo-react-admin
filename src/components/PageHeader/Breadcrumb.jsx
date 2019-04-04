import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styles from './pageHeader.module.scss';
import { Icon } from 'antd';
import classNames from 'classnames';

@withRouter
@inject('layoutStore', 'localeStore')
@observer
class BreadCrumb extends Component {
	componentDidMount() {
		const { layoutStore, location: { pathname } } = this.props
		layoutStore.addBreadcrumb(pathname);
	}

	handleDelBreadcrumb(name) {
		const { layoutStore: { delBreadcrumb }, history } = this.props;
		const existBread = delBreadcrumb(name);
		if (!existBread) {
			history.push('/dashboard');
		} else {
			history.push(existBread.path);
		}
	}

	handleGoBreadPath(path) {
		const { history, location: { pathname } } = this.props;
		if (pathname === path) {
			return;
		}
		history.push(path);
	}

	checkDisplay(path) {
		const { location: { pathname } } = this.props;
		return path === pathname
	}

	render() {
		const { layoutStore: { breadcrumbList }, localeStore: { localeObj } } = this.props
		return <div className={styles.breadcrumbList}>
			{breadcrumbList.map((bread, index) => {
				const { display, path, name } = bread;
				const key = path.split('/').slice(1).join('.');

				return (display ?
					<div key={index}
						className={classNames(
							styles.breadcrumb,
							this.checkDisplay(path) ? styles.display : ''
						)}
						onClick={this.handleGoBreadPath.bind(this, path)}>
						{localeObj[`menu.${key}`]}
						<Icon type="close"
							className={styles.closeIcon}
							onClick={this.handleDelBreadcrumb.bind(this, name)} />
					</div> : null)
			})}
		</div>;
	}
}

export default BreadCrumb;
