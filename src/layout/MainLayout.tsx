import React, { Suspense } from 'react';
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
      setShowHeader,
      setShowMenu,
      isInlineLayout,
      isHorizontalMenu
    }
  } = injected();
  const routeAuthority: undefined | string | string[] = getRouteAuthority(
    location.pathname,
    route.routes
  );

  const viewMain = (
    <Authorized
      routeAuthority={routeAuthority}
      unidentified={
        <Suspense fallback={<Loading spinning />}>
          <Exception403 />
        </Suspense>
      }
    >
      <main className={styles.viewBody}>{children}</main>
      <Footer isInlineLayout={isInlineLayout} isHorizontalMenu={isHorizontalMenu} />
    </Authorized>
  );

  // 分离模式，菜单切割header
  const splitLayout = (
    <>
      {showMenu && (
        <Navigator collapsed={collapsed} isMobile={isMobile} toggleCollapsed={toggleCollapsed} />
      )}
      <div
        id="mainContainer"
        className={classNames(
          styles.routeContent,
          collapsed && styles.collapsed,
          isMobile && styles.isMobile
        )}
      >
        {showHeader && <Header />}
        {viewMain}
      </div>
    </>
  );

  // 行内布局模式，菜单不分割header
  const inlineLayout = (
    <>
      {showHeader && <Header />}
      <div
        id="mainContainer"
        className={classNames(
          styles.routeContent,
          collapsed && styles.collapsed,
          isMobile && styles.isMobile
        )}
      >
        {showMenu && (
          <Navigator collapsed={collapsed} isMobile={isMobile} toggleCollapsed={toggleCollapsed} />
        )}
        <div className={styles.inlineContainer}>{viewMain}</div>
      </div>
    </>
  );

  // 顶部导航栏模式
  const HorizontalMenuLayout = (
    <div id="mainContainer" className={styles.horizontalContainer}>
      {showHeader && <Header />}
      <div className={styles.routeContent}>{viewMain}</div>
      <Loading {...loadingOptions} />
    </div>
  );

  // 左侧导航栏模式
  const VerticalMenuLayout = (
    <div
      className={classNames(
        styles.container,
        isInlineLayout ? styles.inlineLayout : styles.splitLayout,
        !showMenu && styles.withoutMenu,
        !showHeader && styles.withoutHeader
      )}
    >
      <Loading {...loadingOptions} collapsed={collapsed} />
      {isInlineLayout ? inlineLayout : splitLayout}
    </div>
  );

  return (
    <Authorized unidentified={<Redirect to="/user/login" />}>
      <>
        {isHorizontalMenu ? HorizontalMenuLayout : VerticalMenuLayout}
        {!isMobile && process.env.NODE_ENV === 'development' && <LayoutSetting />}
      </>
    </Authorized>
  );
};

export default inject('layoutStore')(observer(MainLayout));
