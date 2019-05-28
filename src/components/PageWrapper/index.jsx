import React, { Component } from 'react';
import PageHeader from '@src/components/PageHeader';
import styles from './pageWrapper.module.scss';
import PropTypes from 'prop-types';

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

PageWrapper.propTypes = {
	hideHeader: PropTypes.bool,
	children: PropTypes.node,
};

export default PageWrapper;
