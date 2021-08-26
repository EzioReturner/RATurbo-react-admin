import React, { Suspense } from 'react';
import Authorized from '@components/Authorized';
import { Redirect, useLocation } from 'react-router-dom';
import LayoutSetting from '@components/LayoutSetting';
import { observer, inject } from 'mobx-react';
import LayoutStore from '@store/layoutStore';
import { getRouteAuthority } from '@utils/authorityTools';
import { Spin } from 'raturbo-components';
import { useSetting } from '@config/setting';
import { Layout } from 'raturbo-components';
import Navigator from './Components/Navigator';
import Header from './Components/Header';
import './Components/styles/index.less';
import './main.less';

const Exception403 = React.lazy(
  () => import(/* webpackChunkName: "403" */ '@views/Exception/403')
);

interface MainSkeletonProps {
  route: RouteRoot;
}

interface InjectProps extends MainSkeletonProps {
  layoutStore: LayoutStore;
}

const MainSkeleton: React.FC<MainSkeletonProps> = props => {
  const {
    layoutStore: {
      layoutStatus: {
        isMobile,
        collapsed,
        fixSiderBar,
        fixHeader,
        navigateMode,
        layoutMode,
        contentAreaWidthMode
      },
      toggleCollapsed
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
        <Suspense fallback={<Spin spinning />}>
          <Exception403 />
        </Suspense>
      }
    >
      <div className="RA-basicLayout-wrapper-viewMain">{children}</div>
    </Authorized>
  );

  return (
    <Authorized unidentified={<Redirect to="/user/login" />}>
      <main style={{ height: '100%' }}>
        <Layout
          collapsed={collapsed}
          onChangeCollapsed={col => toggleCollapsed(col)}
          fixHeader={fixHeader}
          fixSider={fixSiderBar}
          mode={navigateMode}
          isContentFlowMode={contentAreaWidthMode === 'flow'}
          verticalType={layoutMode}
          sider={
            <Navigator
              collapsed={collapsed}
              toggleCollapsed={toggleCollapsed}
              isMobile={isMobile}
            />
          }
          header={<Header />}
        >
          {Content}
        </Layout>
      </main>
      {!isMobile && useSetting && <LayoutSetting />}
    </Authorized>
  );
};

export default inject('layoutStore')(observer(MainSkeleton));
