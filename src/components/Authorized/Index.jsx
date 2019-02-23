import React, { Component } from 'react';
import { getAuthority } from '@utlis/authorityTools';
import { CheckPermission } from './CheckPermission';

class Authorized extends Component {
	render() {
		const { children, routeAuthority, unidentified } = this.props;
		const _children = typeof children === 'undefined' ? null : children;
		const currentAuthority = getAuthority();
		return CheckPermission(
			routeAuthority,
			currentAuthority,
			children,
			unidentified
		);
	}
}

export default Authorized;
