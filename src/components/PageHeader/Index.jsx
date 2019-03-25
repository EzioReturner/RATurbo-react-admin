import React, { Component } from 'react';
import Breadcrumb from './Breadcrumb';
import styles from './pageHeader.module.scss';

class PageHeader extends Component {
	render() {
		const { showBreadcrumb = true } = this.props
		return (
			<div className={styles.pageHeader}>
				{showBreadcrumb && <Breadcrumb />}
				123
			</div>
		);
	}
}

export default PageHeader;
