import React, { PureComponent } from 'react';
import { CheckPermission } from './CheckPermission';
import { inject } from 'mobx-react';

@inject('userStore')
class Authorized extends PureComponent {
	render() {
		const { children, routeAuthority, unidentified, userStore } = this.props;
		const _children = typeof children === 'undefined' ? null : children;
		const currentAuthority = userStore.authority;
		return CheckPermission(
			routeAuthority,
			currentAuthority,
			_children,
			unidentified
		);
	}
}

export default Authorized;
