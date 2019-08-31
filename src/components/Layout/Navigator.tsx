import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';

interface NavigaterProps {
  isMobile: boolean;
  collapsed: boolean;
  toggleCollapsed: Function;
}

const Navigater: React.FC<NavigaterProps> = props => {
  const { isMobile, collapsed, toggleCollapsed } = props;
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      closable={false}
      onClose={() => toggleCollapsed()}
      style={{
        padding: 0,
        height: '100vh'
      }}
      bodyStyle={{
        padding: 0
      }}
    >
      <SiderMenu />
    </Drawer>
  ) : (
    <SiderMenu />
  );
};

export default Navigater;
