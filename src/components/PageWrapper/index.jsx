import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@src/components/PageHeader';
import styles from './pageWrapper.module.scss';

const PageWrapper = (props) => {
	const { hideHeader, children, ...restProps } = props;
	return (
		<div className={styles.pageWrapper}>
			{!hideHeader && <PageHeader {...restProps} />}
			<div className={styles.pageBody}>{children}</div>
		</div>
	);
}

PageWrapper.propTypes = {
	hideHeader: PropTypes.bool,
	children: PropTypes.node,
	title: PropTypes.node,
};

export default PageWrapper;
