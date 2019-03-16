import React, { Component } from 'react';
import styles from './userLayout.module.scss';

class UserLayout extends Component {
	render() {
		const { children } = this.props;
		return (
			<div className={styles.userLayout}>
				<div className={styles.userContext}>{children}</div>
			</div>
		);
	}
}

export default UserLayout;
