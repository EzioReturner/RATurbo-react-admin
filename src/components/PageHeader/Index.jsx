import React, { Component } from 'react';
import Breadcrumb from './Breadcrumb';
import styles from './pageHeader.module.scss';

class PageHeader extends Component {
	render() {
		return (
			<div className={styles.pageHeader}>
				<Breadcrumb />
				123
			</div>
		);
	}
}

export default PageHeader;
