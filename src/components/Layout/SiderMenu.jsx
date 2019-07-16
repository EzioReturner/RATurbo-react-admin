import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { intersection } from 'lodash';
import classNames from 'classnames';
import { logoPath, siteName, menuLinkUrl } from 'config/setting';
import styles from './siderMenu.module.scss';

const { SubMenu } = Menu;
@withRouter
@inject('layoutStore', 'userStore', 'localeStore')
@observer
class SiderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
    };
  }

  componentDidMount() {
    this.initOpenMenu();
  }

  // 检查路由是否匹配信息表
  checkRoute(routeInfo, path) {
    const isArr = Array.isArray(routeInfo);
    const arr = isArr ? routeInfo : routeInfo.routes;
    return arr.find(route => route.path === (isArr ? '' : routeInfo.path) + '/' + path);
  }

  // 初始化开启的菜单
  initOpenMenu() {
    const {
      location: { pathname },
      layoutStore: { routeConfig },
    } = this.props;
    const routes = routeConfig[1].routes;
    let cacheRoute;
    const menuOpen = pathname.split('/').reduce((total, path) => {
      if (path) {
        cacheRoute = this.checkRoute(cacheRoute || routes, path);
        cacheRoute && cacheRoute.routes && total.push(cacheRoute.path);
      }
      return total;
    }, []);
    this.setState({
      openKeys: [...menuOpen],
    });
  }

  // 获取菜单标题
  getMenuTitle(iconType, name, parentName) {
    const {
      localeStore: { localeObj },
    } = this.props;
    const key = parentName ? `menu.${parentName}.${name}` : `menu.${name}`;
    return (
      <span>
        {iconType && <Icon type={iconType} />}
        <span>{localeObj[key] || name}</span>
      </span>
    );
  }

  // 递归生成菜单项
  getNavMenuItem(menuData, parentName) {
    if (!menuData.length) {
      return [];
    }
    const { authority: currentAuthority } = this.props.userStore;
    return menuData
      .filter(menu => {
        const { authority, hideMenu } = menu;
        if (!hideMenu) {
          if (!authority) return true;
          const allowed = intersection(currentAuthority, authority);
          return allowed.length > 0;
        }
        return false;
      })
      .map(res => this.getSubMenuOrItem(res, parentName));
  }

  // 初始化子级菜单或者菜单枝叶
  getSubMenuOrItem(menu, parentName) {
    if (menu.routes && !menu.hideMenu && menu.routes.some(child => child.name)) {
      // 菜单父级
      const { icon, name, path, routes } = menu;
      return (
        <SubMenu title={this.getMenuTitle(icon, name, parentName)} key={path}>
          {this.getNavMenuItem(routes, name)}
        </SubMenu>
      );
    } // 菜单子级枝叶
    return <Menu.Item key={menu.path}>{this.getMenuItem(menu, parentName)}</Menu.Item>;
  }

  handleClickLink() {
    const { isMobile, toggleCollapsed } = this.props.layoutStore;
    isMobile && toggleCollapsed();
  }

  // 生成菜单枝叶
  getMenuItem(menu, parentName = '') {
    const { icon: iconType, name, path } = menu;
    const {
      localeStore: { localeObj },
    } = this.props;
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

  handleOpenMenu = openKeys => {
    const { collapsed, routeConfig } = this.props.layoutStore;
    const moreThanOne = openKeys.filter(key => routeConfig.some(route => route.path === key)).length > 1;
    if (collapsed && !openKeys.length) {
      return;
    }
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  render() {
    const {
      location: { pathname },
      layoutStore: { collapsed, routeConfig },
    } = this.props;
    const menuProps = collapsed ? {} : { openKeys: this.state.openKeys };
    return (
      <div className={classNames(styles.navigator, collapsed ? styles.collapsed : '')} mode="inline">
        <a className={styles.controlBut} href={menuLinkUrl} target="_blank" rel="noopener noreferrer">
          <img alt="" src={logoPath} className={styles.logo} />
          <span className={`ml-2 ${styles.title}`}>{siteName}</span>
        </a>
        <Menu className="myMenu" mode="inline" inlineCollapsed={collapsed} selectedKeys={[pathname]} onOpenChange={this.handleOpenMenu} {...menuProps}>
          {this.getNavMenuItem(routeConfig[1].routes)}
        </Menu>
      </div>
    );
  }
}

export default SiderMenu;
