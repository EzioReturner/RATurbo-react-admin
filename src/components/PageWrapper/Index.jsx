import React, { Component } from 'react';
import PageHeader from '@src/components/PageHeader';
import styles from './pageWrapper.module.scss';

class PageWrapper extends Component {
	render() {
		const { children, ...restProps } = this.props;
		return (
			<div className={styles.pageWrapper}>
				<PageHeader {...restProps} />
				<div className={styles.pageBody}>{children}</div>
			</div>
		);
	}
}

export default PageWrapper;
