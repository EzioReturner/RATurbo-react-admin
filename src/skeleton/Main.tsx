import React, { Suspense } from 'react';
import Authorized from '@components/Authorized';
import { Redirect, useLocation } from 'react-router-dom';
import LayoutSetting from '@components/LayoutSetting';
import { observer, inject } from 'mobx-react';
import LayoutStore from '@store/layoutStore';
import BasicLayout from '@components/Layout/BasicLayout';
import { getRouteAuthority } from '@utils/authorityTools';
import Loading from '@components/Loading';
import { useSetting } from '@config/setting';

const Exception403 = React.lazy(() => import(/* webpackChunkName: "403" */ '@views/Exception/403'));

interface MainSkeletonProps {
  route: RouteRoot;
}

interface InjectProps extends MainSkeletonProps {
  layoutStore: LayoutStore;
}

const MainSkeleton: React.FC<MainSkeletonProps> = props => {
  const {
    layoutStore: {
      firstInit,
      layoutStatus: { isMobile },
      isHorizontalNavigator
    }
  } = props as InjectProps;

  let location = useLocation();

  const { route, children } = props;
  const routeAuthority: undefined | string | string[] = getRouteAuthority(
    location.pathname,
    route.routes
  );

  const Content = (
    <Authorized
      routeAuthority={routeAuthority}
      unidentified={
        <Suspense fallback={<Loading spinning />}>
          <Exception403 />
        </Suspense>
      }
    >
      <div className="RA-basicLayout-wrapper-viewMain">{children}</div>
    </Authorized>
  );

  return (
    <Authorized unidentified={<Redirect to="/user/login" />}>
      <Loading spinning={firstInit} />
      <main style={{ height: '100%' }}>
        <BasicLayout
          {...{
            isHorizontalNavigator
          }}
        >
          {Content}
        </BasicLayout>
      </main>
      {!isMobile && useSetting && <LayoutSetting />}
    </Authorized>
  );
};

export default inject('layoutStore')(observer(MainSkeleton));
