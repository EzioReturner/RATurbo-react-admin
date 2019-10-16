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

const Exception403 = React.lazy(() => import(/* webpackChunkName: "403" */ '@views/Exception/403'));

interface MainLayoutProps extends RouteComponentProps {
  route: RouteConfig;
}

interface MainLayoutInjected extends MainLayoutProps {
  layoutStore: LayoutStore;
}

const MainLayout: React.FC<MainLayoutProps> = props => {
  const inject = () => {
    return props as MainLayoutInjected;
  };
  const {
    children,
    location: { pathname },
    route
  } = props;
  const {
    layoutStore: { collapsed, isMobile, toggleCollapsed, spinning, fixed }
  } = inject();
  const routeAuthority: string | string[] = getRouteAuthority(pathname, route.routes);
  return (
    <Authorized unidentified={<Redirect to="/user/login" />}>
      <div className={styles.container}>
        <Loading spinning={spinning} fixed={fixed} collapsed={collapsed} />
        <Navigator collapsed={collapsed} isMobile={isMobile} toggleCollapsed={toggleCollapsed} />
        <div
          id="mainContainer"
          className={classNames(
            styles.routeContent,
            collapsed ? styles.collapsed : '',
            isMobile ? styles.isMobile : ''
          )}
        >
          <Header />
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

export default inject('layoutStore')(withRouter(observer(MainLayout)));
