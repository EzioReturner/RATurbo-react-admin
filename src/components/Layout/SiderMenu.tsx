import React, { useEffect, useState, useCallback } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import intersection from 'lodash/intersection';
import classNames from 'classnames';
import styles from './siderMenu.module.scss';
import UserStore from '@store/userStore';
import LayoutStore from '@store/layoutStore';
import LocaleStore from '@store/localeStore';
import { RouteChild } from '@/models/layout';
import SiteDetail from './SiteDetail';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import Iconfont from '@components/Iconfont';

interface InjectedProps {
  userStore: UserStore;
  layoutStore: LayoutStore;
  localeStore: LocaleStore;
}

const { SubMenu } = Menu;
let isInitMenuOpen = false;

const SiderMenu: React.FC = props => {
  const [openKeys, setOpenKeys] = useState<any[]>([]);

  const location = useLocation();

  const {
    layoutStore: { routeConfig, isMobile, toggleCollapsed, collapsed, isInlineLayout },
    userStore: { authority: currentAuthority },
    localeStore: { localeObj }
  } = props as InjectedProps;

  const [, appRoutes] = routeConfig;

  // 检查路由是否匹配信息表
  function checkRoute(routeInfo: any, path: string) {
    const isArr = Array.isArray(routeInfo);
    const arr = isArr ? routeInfo : routeInfo.routes;
    return arr.find(
      (route: RouteChild) => route.path === (isArr ? '' : routeInfo.path) + '/' + path
    );
  }

  // 初始化开启的菜单
  const initOpenMenu = useCallback(() => {
    if (isInitMenuOpen) {
      return;
    }
    // 缓存匹配到的路由信息
    let cacheRoute: RouteChild;
    const menuOpen = location.pathname.split('/').reduce((total: string[], path) => {
      if (path) {
        cacheRoute = checkRoute(cacheRoute || appRoutes.routes, path);
        cacheRoute && cacheRoute.routes && total.push(cacheRoute.path);
      }
      return total;
    }, []);
    isInitMenuOpen = true;
    setOpenKeys([...menuOpen]);
  }, [appRoutes.routes, location]);

  useEffect(() => {
    initOpenMenu();
  }, [initOpenMenu]);

  // 获取菜单标题
  function getMenuTitle(name: string = '', parentName?: string, icon?: React.ReactNode) {
    const key = parentName ? `menu.${parentName}.${name}` : `menu.${name}`;
    const localName = localeObj[key] || name;
    return (
      <span>
        {typeof icon === 'string' ? (
          <Iconfont type={icon} />
        ) : (
          icon && (
            <Icon component={icon as React.FunctionComponent<React.SVGProps<SVGSVGElement>>} />
          )
        )}
        <span className={styles.subTitleName} title={localName}>
          {localName}
        </span>
      </span>
    );
  }

  // 递归生成菜单项
  function getNavMenuItem(menuData: RouteChild[], parentName?: string) {
    if (!menuData.length) {
      return [];
    }
    return menuData
      .filter((menu: RouteChild) => {
        const { authority, hideMenu } = menu;
        if (!hideMenu) {
          if (!authority) return true;
          const allowed = intersection(currentAuthority, authority);
          return allowed.length > 0;
        }
        return false;
      })
      .map((res: RouteChild) => getSubMenuOrItem(res, parentName));
  }

  // 初始化子级菜单或者菜单枝叶
  function getSubMenuOrItem(menu: RouteChild, parentName?: string) {
    if (menu.routes && !menu.hideMenu && menu.routes.some((child: RouteChild) => child.name)) {
      // 菜单父级
      const { icon, name, path, routes } = menu;
      return (
        <SubMenu title={getMenuTitle(name, parentName, icon)} key={path}>
          {getNavMenuItem(routes, name)}
        </SubMenu>
      );
    } // 菜单子级枝叶
    return <Menu.Item key={menu.path}>{getMenuItem(menu, parentName)}</Menu.Item>;
  }

  function handleClickLink() {
    isMobile && toggleCollapsed();
  }

  // 生成菜单枝叶
  function getMenuItem(menu: RouteChild, parentName?: string) {
    const { icon, name, path } = menu;
    const key = parentName ? `menu.${parentName}.${name}` : `menu.${name}`;
    const localName = localeObj[key] || name;
    return (
      <Link
        to={path}
        replace
        onClick={() => {
          handleClickLink();
        }}
      >
        {typeof icon === 'string' ? (
          <Iconfont type={icon} />
        ) : (
          icon && (
            <Icon component={icon as React.FunctionComponent<React.SVGProps<SVGSVGElement>>} />
          )
        )}
        <span className={styles.titleName} title={localName}>
          {localName}
        </span>
      </Link>
    );
  }

  const handleOpenMenu = (openKeys: string[]) => {
    const moreThanOne =
      openKeys.filter(key => routeConfig.some(route => route.path === key)).length > 1;
    if (collapsed && !openKeys.length) {
      return;
    }
    setOpenKeys(moreThanOne ? [openKeys.pop()] : [...openKeys]);
  };

  const menuProps = collapsed ? {} : { openKeys: openKeys };
  const iconCollapsed = collapsed ? (
    <MenuUnfoldOutlined className={styles.foldIcon} />
  ) : (
    <MenuFoldOutlined className={styles.foldIcon} />
  );
  return (
    <aside
      className={classNames(
        styles.navigator,
        collapsed && styles.collapsed,
        isInlineLayout && styles.inlineLayout
      )}
    >
      {!isInlineLayout && <SiteDetail isInlineLayout={isInlineLayout} />}
      <Menu
        className="myMenu"
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[location.pathname]}
        onOpenChange={handleOpenMenu}
        {...menuProps}
      >
        {getNavMenuItem(appRoutes.routes || [])}
      </Menu>
      {isInlineLayout && (
        <div className={styles.footerCollapsedIcon} onClick={() => toggleCollapsed()}>
          {iconCollapsed}
        </div>
      )}
    </aside>
  );
};

export default inject('layoutStore', 'userStore', 'localeStore')(observer(SiderMenu));
