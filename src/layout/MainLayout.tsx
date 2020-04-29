import React, { Suspense, useMemo } from 'react';
import Loading from '@components/Loading';
import Authorized from '@components/Authorized';
import { Header, Navigator } from '@components/Layout';
import { Redirect, useLocation } from 'react-router-dom';
import { getRouteAuthority } from '@utils/authorityTools';
import classNames from 'classnames';
import Footer from '@components/Footer';
import { observer, inject } from 'mobx-react';
import styles from './mainLayout.module.scss';
import LayoutStore from '@store/layoutStore';
import { RouteConfig } from '@/models/layout';
import LayoutSetting from './LayoutSetting';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

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
      collapsed,
      isMobile,
      toggleCollapsed,
      loadingOptions,
      showMenu,
      showHeader,
      lockMenuScroll,
      lockHeaderScroll,
      isContentFlowMode,
      isInlineLayout,
      isHorizontalNavigator
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
      <main className={styles.viewBody}>{children}</main>
    </Authorized>
  );

  const LayoutWrapper = (child: any) => (
    <div
      id="mainContainer"
      className={classNames(
        styles.layoutWrapper,
        collapsed && styles.collapsed,
        isMobile && styles.isMobile
      )}
    >
      {child}
    </div>
  );

  // 分割模式，菜单切割header
  const splitLayout = (
    <>
      {showMenu && RANavigator}
      <div
        id="mainContainer"
        className={classNames(
          styles.layoutWrapper,
          collapsed && styles.collapsed,
          isMobile && styles.isMobile,
          lockHeaderScroll && styles.lockHeaderScroll
        )}
      >
        {showHeader && <Header />}
        <div
          className={classNames(styles.containerWrapper, lockMenuScroll && styles.lockMenuScroll)}
        >
          {ViewMain}
          <Footer propStyle={{ marginBottom: '16px' }} />
        </div>
      </div>
    </>
  );

  const IconCollapsed = collapsed ? (
    <MenuUnfoldOutlined className={styles.foldIcon} />
  ) : (
    <MenuFoldOutlined className={styles.foldIcon} />
  );

  // 一体布局模式，菜单不分割header
  const inlineLayout = (
    <>
      {showHeader && <Header />}
      <div
        id="mainContainer"
        className={classNames(
          styles.layoutWrapper,
          collapsed && styles.collapsed,
          isMobile && styles.isMobile
        )}
      >
        <div
          className={classNames(styles.containerWrapper, lockMenuScroll && styles.lockMenuScroll)}
        >
          {showMenu && RANavigator}
          {ViewMain}
        </div>
      </div>
      <div className={styles.inlineFooter}>
        <div
          className={classNames(styles.footerCollapsedIcon, collapsed && styles.collapsed)}
          onClick={() => toggleCollapsed()}
        >
          {IconCollapsed}
        </div>
        <Footer propStyle={{ alignSelf: 'flex-end' }} />
      </div>
    </>
  );

  // 顶部导航栏模式
  const HorizontalMenuLayout = (
    <div id="mainContainer" className={styles.horizontalContainer}>
      {showHeader && <Header />}
      <div className={classNames(styles.routeContent, isContentFlowMode && styles.flowMode)}>
        {ViewMain}
      </div>
      <Loading {...loadingOptions} />
    </div>
  );

  // 左侧导航栏模式
  const VerticalMenuLayout = (
    <div
      className={classNames(
        styles.raBasicLayout,
        isInlineLayout ? styles.inlineLayout : styles.splitLayout,
        !showMenu && styles.withoutMenu,
        !showHeader && styles.withoutHeader,
        lockMenuScroll && styles.lockMenuScroll,
        lockHeaderScroll && styles.lockHeaderScroll
      )}
    >
      <Loading {...loadingOptions} collapsed={collapsed} />
      {isInlineLayout ? inlineLayout : splitLayout}
    </div>
  );

  return (
    <Authorized unidentified={<Redirect to="/user/login" />}>
      <>
        {isHorizontalNavigator ? HorizontalMenuLayout : VerticalMenuLayout}
        {!isMobile && process.env.NODE_ENV === 'development' && <LayoutSetting />}
      </>
    </Authorized>
  );
};

export default inject('layoutStore')(observer(MainLayout));
