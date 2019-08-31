import React from 'react';
import { inject } from 'mobx-react';
import CheckPermission from './CheckPermission';

interface AuthorizedProps {
  routeAuthority: string[] | string | undefined;
  unidentified: React.ReactNode;
  userStore: any;
}

@inject('userStore')
class Authorized extends React.PureComponent<AuthorizedProps> {
  render() {
    const { children, routeAuthority, unidentified, userStore } = this.props;
    const _children = typeof children === 'undefined' ? null : children;
    const currentAuthority: string | string[] = userStore.authority;
    return CheckPermission(routeAuthority, currentAuthority, _children, unidentified);
  }
}

export default Authorized;
