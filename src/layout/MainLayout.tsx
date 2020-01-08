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
import { RouteConfig } from '@models/index';
import { hot } from 'react-hot-loader';
import { useMenu, useHeader } from '@config/setting';
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
    layoutStore: { collapsed, isMobile, toggleCollapsed, spinning, fixed }
  } = injected();
  const routeAuthority: string | string[] = getRouteAuthority(pathname, route.routes);
  return (
    <Authorized unidentified={<Redirect to="/user/login" />}>
      <div
        className={classNames(
          styles.container,
          !useMenu && styles.withoutMenu,
          !useHeader && styles.withoutHeader
        )}
      >
        <Loading spinning={spinning} fixed={fixed} collapsed={collapsed} />
        {useMenu && (
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
          {useHeader && <Header />}
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
          <Footer />
        </div>
      </div>
    </Authorized>
  );
};
const Main =
  process.env.NODE_ENV === 'development' ? hot(module)(observer(MainLayout)) : observer(MainLayout);
export default inject('layoutStore')(withRouter(Main));
