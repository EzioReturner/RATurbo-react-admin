import React, {Component} from 'react';
import '@style/layout/navigator.scss';
import {Menu, Icon} from 'antd';
import {Link} from "react-router-dom";
import routeConfig from '../config/router.config';

const {SubMenu} = Menu;
class Navigater extends Component {

  getMenuTitle(iconType, name) {
    return (
      <span>{iconType && <Icon type={iconType}/>}
        <span>{name}</span>
      </span>
    )
  }

  getNavMenuItem(menuData) {
    if (!menuData.length) {
      return [];
    }
    return menuData.filter(menu => !menu.hideMenu).map(
      res => this.getSubMenuOrItem(res)
    );
  }

  getSubMenuOrItem(menu) {
    if (menu.children && !menu.hideMenu && menu.children.some(child => child.name)) {
      const {icon, name, path, children} = menu;
      return (
        <SubMenu title={this.getMenuTitle(icon, name)} key={path}>
          {this.getNavMenuItem(children)}
        </SubMenu>
      )
    }
    return <Menu.Item key={menu.path}>{this.getMenuItem(menu)}</Menu.Item>
  }

  getMenuItem(menu) {
    const {icon: iconType, name, path} = menu;
    return (
      <Link to={path}>
        {iconType && <Icon type={iconType}/>}
        <span>{name}</span>
      </Link>
    )
  }

  render() {
    const selectedKeys = ['aahha'];
    return (
      <div className="navigator" mode="inline">
        <Menu className="myMenu" mode="inline" selectedKeys={selectedKeys}>
          {this.getNavMenuItem(routeConfig)}
        </Menu>
      </div>
    )
  }
}
export default Navigater
