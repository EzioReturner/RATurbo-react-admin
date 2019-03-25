import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styles from './pageHeader.module.scss';
import { Icon } from 'antd';

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

	render() {
		const { breadcrumbList } = this.props.layoutStore;
		return <div className={styles.breadcrumbList}>
			{breadcrumbList.map((bread, index) => {
				return (bread.display ? <div key={index} className={styles.breadcrumb} onClick={this.handleGoBreadPath.bind(this, bread.path)}>{bread.name}
					<Icon type="close" className={styles.closeIcon} onClick={this.handleDelBreadcrumb.bind(this, bread.name)} />
				</div> : null)
			})}
		</div>;
	}
}

export default BreadCrumb;
