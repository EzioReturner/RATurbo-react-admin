import React, { Suspense, useMemo } from 'react';
import Loading from '@components/Loading';
import Authorized from '@components/Authorized';
import { Header, Navigator } from '@components/Layout';
import { Redirect, useLocation } from 'react-router-dom';
import { getRouteAuthority } from '@utils/authorityTools';
import classNames from 'classnames';
import Footer from '@components/Footer';
import { observer, inject } from 'mobx-react';
import LayoutStore from '@store/layoutStore';
import { RouteConfig } from '@/models/layout';
import LayoutSetting from '@components/LayoutSetting';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './mainLayout.less';

const Exception403 = React.lazy(() => import(/* webpackChunkName: "403" */ '@views/Exception/403'));

interface MainLayoutProps {
  route: RouteConfig;
}

interface MainLayoutInjected extends MainLayoutProps {
  layoutStore: LayoutStore;
}

const MainLayout: React.FC<MainLayoutProps> = props => {
  let location = useLocation();
  const injected = () => {
    return props as MainLayoutInjected;
  };
  const { children, route } = props;
  const {
    layoutStore: {
      layoutStatus: { collapsed, isMobile, showSiderBar, showHeader, fixSiderBar, fixHeader },
      toggleCollapsed,
      loadingOptions,
      isContentFlowMode,
      isInlineLayout,
      isHorizontalNavigator,
      isDarkTheme
    }
  } = injected();
  const routeAuthority: undefined | string | string[] = getRouteAuthority(
    location.pathname,
    route.routes
  );

  const RANavigator = useMemo(
    () => <Navigator collapsed={collapsed} isMobile={isMobile} toggleCollapsed={toggleCollapsed} />,
    [collapsed, isMobile, toggleCollapsed]
  );

  const ViewMain = (
    <Authorized
      routeAuthority={routeAuthority}
      unidentified={
        <Suspense fallback={<Loading spinning />}>
          <Exception403 />
        </Suspense>
      }
    >
      <main className="RA-basicLayout-wrapper-viewMain">{children}</main>
    </Authorized>
  );

  // 分割模式，菜单切割header
  const splitModeLayout = (
    <>
      {showSiderBar && RANavigator}
      <div
        id="mainContainer"
        className={classNames(
          'RA-basicLayout-wrapper',
          collapsed && 'RA-basicLayout-wrapper-collapsed'
        )}
      >
        {showHeader && <Header />}
        <div className="RA-basicLayout-wrapper-content">
          {ViewMain}
          <Footer propStyle={{ marginBottom: '16px' }} />
        </div>
      </div>
    </>
  );

  const IconCollapsed = collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;

  // 一体布局模式，菜单不分割header
  const inlineModeLayout = (
    <>
      {showHeader && <Header />}
      <div
        id="mainContainer"
        className={classNames(
          'RA-basicLayout-wrapper',
          collapsed && 'RA-basicLayout-wrapper-collapsed'
        )}
      >
        {showSiderBar && RANavigator}
        {ViewMain}
      </div>
      <div
        className={classNames(
          'RA-basicLayout-inlineMode-footer',
          isDarkTheme && 'RA-basicLayout-inlineMode-footer-dark'
        )}
      >
        {showSiderBar && (
          <div
            className={classNames(
              'RA-basicLayout-inlineMode-footer-icon',
              collapsed && 'RA-basicLayout-inlineMode-footer-collapsed'
            )}
            onClick={() => toggleCollapsed()}
          >
            {IconCollapsed}
          </div>
        )}
        <Footer propStyle={{ alignSelf: 'flex-end' }} />
      </div>
    </>
  );

  // 顶部导航栏模式
  const HorizontalMenuLayout = (
    <div
      id="mainContainer"
      className={classNames(
        'RA-basicLayout-horizontal',
        !showHeader && 'RA-basicLayout-horizontal-hideHeader',
        isContentFlowMode && 'RA-basicLayout-horizontal-contentFlow',
        fixHeader && 'RA-basicLayout-horizontal-fixHeader'
      )}
    >
      {showHeader && <Header />}
      <div className="RA-basicLayout-horizontal-wrapper">
        {ViewMain}
        <Footer propStyle={{ marginTop: '16px' }} />
      </div>
      <Loading {...loadingOptions} />
    </div>
  );

  // 左侧导航栏模式
  const VerticalMenuLayout = (
    <div
      className={classNames(
        'RA-basicLayout',
        isInlineLayout ? 'RA-basicLayout-inlineMode' : 'RA-basicLayout-splitMode',
        !showSiderBar && 'RA-basicLayout-hideMenu',
        !showHeader && 'RA-basicLayout-hideHeader',
        fixHeader && 'RA-basicLayout-fixHeader',
        fixSiderBar && 'RA-basicLayout-fixSiderBar',
        isMobile && 'RA-basicLayout-mobile'
      )}
    >
      <Loading {...loadingOptions} collapsed={collapsed} />
      {isInlineLayout ? inlineModeLayout : splitModeLayout}
    </div>
  );

  return (
    <Authorized unidentified={<Redirect to="/user/login" />}>
      <>
        {isHorizontalNavigator ? HorizontalMenuLayout : VerticalMenuLayout}
        {!isMobile && <LayoutSetting />}
      </>
    </Authorized>
  );
};

export default inject('layoutStore')(observer(MainLayout));
