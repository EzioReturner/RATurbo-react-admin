import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { intersection } from 'lodash';
import classNames from 'classnames';
import { logoPath, siteName, menuLinkUrl } from '@config/setting';
import styles from './siderMenu.module.scss';
import UserStore from '@store/userStore';
import LayoutStore from '@store/layoutStore';
import LocaleStore from '@store/localeStore';
import { RouteChild, RouteConfig } from '@models/index';
interface InjectedProps extends RouteComponentProps {
  userStore: UserStore;
  layoutStore: LayoutStore;
  localeStore: LocaleStore;
}

const { SubMenu } = Menu;
@inject('layoutStore', 'userStore', 'localeStore')
@observer
class SiderMenu extends React.Component<RouteComponentProps> {
  get injected() {
    return this.props as InjectedProps;
  }

  state = {
    openKeys: []
  };

  componentDidMount() {
    this.initOpenMenu();
  }

  // 检查路由是否匹配信息表
  checkRoute(routeInfo: any, path: string) {
    const isArr = Array.isArray(routeInfo);
    const arr = isArr ? routeInfo : routeInfo.routes;
    return arr.find(
      (route: RouteChild) => route.path === (isArr ? '' : routeInfo.path) + '/' + path
    );
  }

  // 初始化开启的菜单
  initOpenMenu() {
    const {
      location: { pathname }
    } = this.props;
    const {
      layoutStore: { routeConfig }
    } = this.injected;

    const routes = routeConfig[1].routes;
    let cacheRoute: RouteChild;
    const menuOpen = pathname.split('/').reduce((total: string[], path) => {
      if (path) {
        cacheRoute = this.checkRoute(cacheRoute || routes, path);
        cacheRoute && cacheRoute.routes && total.push(cacheRoute.path);
      }
      return total;
    }, []);
    this.setState({
      openKeys: [...menuOpen]
    });
  }

  // 获取菜单标题
  getMenuTitle(name: string = '', parentName?: string, iconType?: string) {
    const {
      localeStore: { localeObj }
    } = this.injected;
    const key = parentName ? `menu.${parentName}.${name}` : `menu.${name}`;
    return (
      <span>
        {iconType && <Icon type={iconType} />}
        <span>{localeObj[key] || name}</span>
      </span>
    );
  }

  // 递归生成菜单项
  getNavMenuItem(menuData: RouteChild[] | RouteConfig[], parentName?: string) {
    if (!menuData.length) {
      return [];
    }
    const { authority: currentAuthority } = this.injected.userStore;
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
      .map((res: RouteChild) => this.getSubMenuOrItem(res, parentName));
  }

  // 初始化子级菜单或者菜单枝叶
  getSubMenuOrItem(menu: RouteChild, parentName?: string) {
    if (menu.routes && !menu.hideMenu && menu.routes.some((child: RouteChild) => child.name)) {
      // 菜单父级
      const { icon, name, path, routes } = menu;
      return (
        <SubMenu title={this.getMenuTitle(name, parentName, icon)} key={path}>
          {this.getNavMenuItem(routes, name)}
        </SubMenu>
      );
    } // 菜单子级枝叶
    return <Menu.Item key={menu.path}>{this.getMenuItem(menu, parentName)}</Menu.Item>;
  }

  handleClickLink() {
    const { isMobile, toggleCollapsed } = this.injected.layoutStore;
    isMobile && toggleCollapsed();
  }

  // 生成菜单枝叶
  getMenuItem(menu: RouteChild, parentName?: string) {
    const { icon: iconType, name, path } = menu;
    const {
      localeStore: { localeObj }
    } = this.injected;
    const key = parentName ? `menu.${parentName}.${name}` : `menu.${name}`;
    return (
      <Link
        to={path}
        replace
        onClick={() => {
          this.handleClickLink();
        }}
      >
        {iconType && <Icon type={iconType} />}
        <span>{localeObj[key] || name}</span>
      </Link>
    );
  }

  handleOpenMenu = (openKeys: string[]) => {
    const { collapsed, routeConfig } = this.injected.layoutStore;
    const moreThanOne =
      openKeys.filter(key => routeConfig.some(route => route.path === key)).length > 1;
    if (collapsed && !openKeys.length) {
      return;
    }
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
    });
  };

  render() {
    const {
      location: { pathname }
    } = this.props;
    const {
      layoutStore: { collapsed, routeConfig }
    } = this.injected;

    const layoutRouterConfig = routeConfig[1].routes || [];
    const menuProps = collapsed ? {} : { openKeys: this.state.openKeys };
    return (
      <aside className={classNames(styles.navigator, collapsed ? styles.collapsed : '')}>
        <a
          className={styles.controlBut}
          href={menuLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img alt="" src={logoPath} className={styles.logo} />
          <span className={`ml-2 ${styles.title}`}>{siteName}</span>
        </a>
        <Menu
          className="myMenu"
          mode="inline"
          inlineCollapsed={collapsed}
          selectedKeys={[pathname]}
          onOpenChange={this.handleOpenMenu}
          {...menuProps}
        >
          {this.getNavMenuItem(layoutRouterConfig)}
        </Menu>
      </aside>
    );
  }
}

export default withRouter(SiderMenu);
