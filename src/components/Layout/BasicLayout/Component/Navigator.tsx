import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';
import { LayoutProps } from '../types';

interface NavigaterProps extends LayoutProps {
  isMobile: boolean;
  collapsed: boolean;
  toggleCollapsed: Function;
}

const Navigater: React.FC<NavigaterProps> = props => {
  const { isMobile, collapsed, toggleCollapsed, ...rest } = props;
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
      <SiderMenu {...rest} />
    </Drawer>
  ) : (
    <SiderMenu {...rest} />
  );
};

export default Navigater;
