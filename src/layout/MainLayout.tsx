import React, { Suspense, useState } from 'react';
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
import { hot } from 'react-hot-loader';
import { SettingOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';

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
      isInlineLayout
    }
  } = injected();
  const routeAuthority: undefined | string | string[] = getRouteAuthority(
    location.pathname,
    route.routes
  );

  const [openSetting, setOpenSetting] = useState(false);

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
      <Footer isInlineLayout={isInlineLayout} />
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
          styles.inlineLayout
        )}
      >
        {showMenu && (
          <Navigator collapsed={collapsed} isMobile={isMobile} toggleCollapsed={toggleCollapsed} />
        )}
        <div className={styles.inlineContainer}>{viewMain}</div>
      </div>
    </>
  );

  const LayoutSetting = (
    <div className={classNames(styles.layoutSetting, openSetting && styles.openSetting)}>
      <SettingOutlined
        className={styles.settingIcon}
        onClick={() => setOpenSetting(!openSetting)}
      />
      <div className={styles.layoutSettingPanel}>
        <Checkbox
          id="setting_setShowHeader"
          defaultChecked
          onChange={e => setShowHeader(e.target.checked)}
        >
          show header
        </Checkbox>
        <Checkbox
          id="setting_setShowMenu"
          defaultChecked
          onChange={e => setShowMenu(e.target.checked)}
        >
          show menu
        </Checkbox>
      </div>
    </div>
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
        {isInlineLayout && inlineLayout}
        {!isInlineLayout && splitLayout}
        {LayoutSetting}
      </div>
    </Authorized>
  );
};

export default inject('layoutStore')(observer(MainLayout));
