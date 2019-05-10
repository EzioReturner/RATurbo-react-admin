import React, { Component } from 'react';
import PageHeader from '@src/components/PageHeader';
import styles from './pageWrapper.module.scss';

class PageWrapper extends Component {
	render() {
		const { hideHeader, children, ...restProps } = this.props;
		return (
			<div className={styles.pageWrapper}>
				{!hideHeader && <PageHeader {...restProps} />}
				<div className={styles.pageBody}>{children}</div>
			</div>
		);
	}
}

export default PageWrapper;
