import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styles from './pageHeader.module.scss';
import { Icon } from 'antd';
import classNames from 'classnames'
@withRouter
@inject('layoutStore')
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
		const { layoutStore: { breadcrumbList } } = this.props
		return <div className={styles.breadcrumbList}>
			{breadcrumbList.map((bread, index) => {
				return (bread.display ?
					<div key={index}
						className={classNames(
							styles.breadcrumb,
							this.checkDisplay(bread.path) ? styles.display : ''
						)}
						onClick={this.handleGoBreadPath.bind(this, bread.path)}>
						{bread.name}
						<Icon type="close"
							className={styles.closeIcon}
							onClick={this.handleDelBreadcrumb.bind(this, bread.name)} />
					</div> : null)
			})}
		</div>;
	}
}

export default BreadCrumb;
