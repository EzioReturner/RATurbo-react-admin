import React from 'react';
import Authorized from '@components/Authorized';
import { Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import LayoutStore from '@store/layoutStore';
import LayoutSetting from '@components/LayoutSetting';
import './basicLayout.less';
import HorizontalMode from './HorizontalMode';
import VerticalMode from './VerticalMode';

interface MainLayoutProps {
  route: RouteConfig;
}

interface MainLayoutInjected extends MainLayoutProps {
  layoutStore: LayoutStore;
}

const MainLayout: React.FC<MainLayoutProps> = props => {
  const {
    layoutStore: {
      layoutStatus: { isMobile },
      isHorizontalNavigator
    }
  } = props as MainLayoutInjected;

  return (
    <Authorized unidentified={<Redirect to="/user/login" />}>
      <>
        {isHorizontalNavigator ? <HorizontalMode {...props} /> : <VerticalMode {...props} />}
        {!isMobile && <LayoutSetting />}
      </>
    </Authorized>
  );
};

export default inject('layoutStore')(observer(MainLayout));
