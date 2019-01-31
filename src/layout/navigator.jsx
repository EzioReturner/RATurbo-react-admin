import React, {Component} from 'react';
import '@style/navigator.scss';
import {Menu, Icon} from 'antd';
import {Link} from "react-router-dom";

const {SubMenu} = Menu;
class Navigater extends Component {
  render() {
    return (<div className="navigator" mode="inline">
      <Menu className="myMenu" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/dashboard">
            <Icon type="pie-chart"/>
            <span>dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/map">
            <Icon type="heat-map"/>
            <span>Map</span>
          </Link>
        </Menu.Item>
        <SubMenu key="sub2" title={<span> < Icon type = "appstore" />< span > Navigation Two</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>)
  }
}
export default Navigater
