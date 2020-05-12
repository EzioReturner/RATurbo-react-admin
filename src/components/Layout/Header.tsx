import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import SelectLang from '../SelectLang';
import UserInfo from './UserInfo';
import LayoutStore from '@store/layoutStore';
import SiteDetail from './SiteDetail';
import TopMenu from './SiderMenu';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
interface InjectedProps {
  layoutStore: LayoutStore;
}

const Header: React.FC = props => {
  const {
    layoutStore: {
      toggleCollapsed,
      collapsed,
      isMobile,
      showMenu,
      isInlineLayout,
      isHorizontalNavigator,
      isContentFlowMode,
      lockHeaderScroll,
      isDarkTheme
    }
  } = props as InjectedProps;

  const IconCollapsed = collapsed ? (
    <MenuUnfoldOutlined className="RA-header-foldIcon" onClick={() => toggleCollapsed()} />
  ) : (
    <MenuFoldOutlined className="RA-header-foldIcon" onClick={() => toggleCollapsed()} />
  );

  const VerticalMenuHeader = (
    <header
      className={classNames(
        'RA-header',
        'RA-header-vertical',
        collapsed && 'RA-header-collapsed',
        isMobile && 'RA-header-isMobile',
        !showMenu && 'RA-header-withoutMenu',
        isInlineLayout ? 'RA-header-inlineLayout' : 'RA-header-splitLayout',
        lockHeaderScroll && 'RA-header-lockHeaderScroll',
        isDarkTheme && 'RA-header-darkTheme'
      )}
    >
      {isInlineLayout && <SiteDetail inlineLayout={isInlineLayout} />}
      {showMenu && !isInlineLayout && IconCollapsed}
      <div className="RA-header-rightPlace">
        <UserInfo />
        <SelectLang />
      </div>
    </header>
  );

  const HorizontalMenuHeader = (
    <header className={classNames('RA-header', 'RA-header-horizontal')}>
      <div
        className={classNames(
          'RA-header-container',
          isContentFlowMode && 'RA-header-container-flowMode'
        )}
      >
        <SiteDetail inlineLayout horizontalNavigator />
        <div className="RA-header-headerNav">
          <TopMenu />
        </div>
        <div className="RA-header-rightPlace">
          <UserInfo />
          <SelectLang />
        </div>
      </div>
    </header>
  );

  return <>{isHorizontalNavigator ? HorizontalMenuHeader : VerticalMenuHeader}</>;
};
export default inject('layoutStore')(observer(Header));
