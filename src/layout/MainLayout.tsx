import React, { Suspense } from 'react';
import Loading from '@components/Loading';
import Authorized from '@components/Authorized';
import { Header, Navigator } from '@components/Layout';
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { getRouteAuthority } from '@utils/authorityTools';
import classNames from 'classnames';
import Footer from '@components/Footer';
import { observer, inject } from 'mobx-react';
import styles from './mainLayout.module.scss';
import LayoutStore from '@store/layoutStore';
import { RouteConfig } from '@/models/layout';
import { hot } from 'react-hot-loader';
import { inlineHeader } from '@config/setting';
const Exception403 = React.lazy(() => import(/* webpackChunkName: "403" */ '@views/Exception/403'));

interface MainLayoutProps extends RouteComponentProps {
  route: RouteConfig;
}

interface MainLayoutInjected extends MainLayoutProps {
  layoutStore: LayoutStore;
}

const MainLayout: React.FC<MainLayoutProps> = props => {
  const injected = () => {
    return props as MainLayoutInjected;
  };
  const {
    children,
    location: { pathname },
    route
  } = props;
  const {
    layoutStore: { collapsed, isMobile, toggleCollapsed, loadingOptions, showMenu, showHeader }
  } = injected();
  const routeAuthority: string | string[] = getRouteAuthority(pathname, route.routes);

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
    </Authorized>
  );

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
        <Footer />
      </div>
    </>
  );

  const inlineLayout = (
    <>
      {showHeader && <Header />}
      <div
        id="mainContainer"
        className={classNames(
          styles.routeContent,
          collapsed && styles.collapsed,
          isMobile && styles.isMobile,
          inlineHeader && styles.inlineHeader
        )}
      >
        {showMenu && (
          <Navigator collapsed={collapsed} isMobile={isMobile} toggleCollapsed={toggleCollapsed} />
        )}
        <div className={styles.inlineContainer}>
          {viewMain}
          <Footer />
        </div>
      </div>
    </>
  );

  return (
    <Authorized unidentified={<Redirect to="/user/login" />}>
      <div
        className={classNames(
          styles.container,
          !showMenu && styles.withoutMenu,
          !showHeader && styles.withoutHeader
        )}
      >
        <Loading {...loadingOptions} collapsed={collapsed} />
        {inlineHeader ? inlineLayout : splitLayout}
      </div>
    </Authorized>
  );
};

export default inject('layoutStore')(withRouter(observer(MainLayout)));
