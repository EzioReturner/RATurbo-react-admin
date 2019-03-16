import React, { Component } from 'react';
import PageHeader from '@components/PageHeader/Index';
import styles from './pageWrapper.module.scss';

class PageWrapper extends Component {
	render() {
		const { children } = this.props;
		return (
			<div className={styles.pageWrapper}>
				<PageHeader />
				<div className={styles.pageBody}>{children}</div>
			</div>
		);
	}
}

export default PageWrapper;
