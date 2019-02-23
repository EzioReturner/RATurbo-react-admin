import React, { Component } from 'react';
import './userLayout.scss';

class UserLayout extends Component {
	render() {
		const { children } = this.props;
		return (
			<div className="userLayout">
				<div className="userContext">{children}</div>
			</div>
		);
	}
}

export default UserLayout;
