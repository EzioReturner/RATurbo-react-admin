import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from './Breadcrumb';
import styles from './pageHeader.module.scss';

const PageHeader = (props) => {
	const {
		hideBreadcrumb,
		title,
		subTitle,
		content,
		extraContent,
		logo,
	} = props
	return (
		<div className={styles.pageHeader}>
			{!hideBreadcrumb && <Breadcrumb />}
			{logo && <div className={styles.logo}>{logo}</div>}
			<div className={styles.main}>
				<div className={styles.row}>
					{title && <h1 className={styles.title}>{title}</h1>}
					{subTitle && <div className={styles.subTitle}>{subTitle}</div>}
				</div>
				<div className={styles.row}>
					{content && <div className={styles.content}>{content}</div>}
					{extraContent && <div className={styles.extraContent}>{extraContent}</div>}
				</div>
			</div>
		</div>
	);
}

PageHeader.propTypes = {
	hideBreadcrumb: PropTypes.bool,
	title: PropTypes.node,
	subTitle: PropTypes.node,
	content: PropTypes.node,
	extraContent: PropTypes.node,
	logo: PropTypes.node,
};

export default PageHeader;
