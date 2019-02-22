import React, { Component } from 'react';
import { getAuthority } from './AuthorityFunc';
import { CheckPermission } from './CheckPermission';

class RenderAuthorized extends Component {
	render() {
		const { children, authority, unidentified } = this.props;
		const _children = typeof children === 'undefined' ? null : children;
		const currentAuthority = getAuthority();
		return CheckPermission(authority, currentAuthority, children, unidentified);
	}
}

export default RenderAuthorized;
