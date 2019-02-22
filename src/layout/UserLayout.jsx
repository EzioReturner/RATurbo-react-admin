import React, { Component } from 'react';
import './userLayout.scss';

class UserLayout extends Component {
	render() {
		const { children } = this.props;
		return (
			<div className="userLayout">
				<div className="titile">
					<img src={require('@assets/logo.png')} />
					<p>
						R<span>A</span>-Turb<span>o</span>
					</p>
				</div>
				<div className="container">{children}</div>
			</div>
		);
	}
}

export default UserLayout;
