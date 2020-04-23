import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import CheckPermission from './CheckPermission';
import UserStore from '@store/userStore';
import Loading from '@components/Loading';

interface AuthorizedProps {
  routeAuthority?: string[] | string | undefined;
  unidentified: React.ReactNode;
}

interface AuthorizedInjected extends AuthorizedProps {
  userStore: UserStore;
}

const Authorized: React.FC<AuthorizedProps> = props => {
  const inject = () => {
    return props as AuthorizedInjected;
  };
  const {
    userStore: { identifyStatus, authority }
  } = inject();

  const { children, routeAuthority, unidentified } = props;
  const _children: React.ReactNode = typeof children === 'undefined' ? null : children;
  const currentAuthority: string | string[] = authority;

  const dom = CheckPermission(routeAuthority, currentAuthority, _children, unidentified);

  return <>{identifyStatus === 'identifying' ? <Loading spinning text="identifying..." /> : dom}</>;
};

export default inject('userStore')(observer(Authorized));
