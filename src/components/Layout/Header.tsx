import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import SelectLang from '../SelectLang';
import styles from './header.module.less';
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
    <MenuUnfoldOutlined className={styles.foldIcon} onClick={() => toggleCollapsed()} />
  ) : (
    <MenuFoldOutlined className={styles.foldIcon} onClick={() => toggleCollapsed()} />
  );

  const VerticalMenuHeader = (
    <header
      className={classNames(
        styles.header,
        styles.verticalMenu,
        collapsed && styles.collapsed,
        isMobile && styles.isMobile,
        !showMenu && styles.withoutMenu,
        isInlineLayout ? styles.inlineLayout : styles.splitLayout,
        lockHeaderScroll && styles.lockHeaderScroll,
        isDarkTheme && styles.darkTheme
      )}
    >
      {isInlineLayout && <SiteDetail inlineLayout={isInlineLayout} />}
      {showMenu && !isInlineLayout && IconCollapsed}
      <div className={styles.rightPart}>
        <UserInfo />
        <SelectLang />
      </div>
    </header>
  );

  const HorizontalMenuHeader = (
    <header className={classNames(styles.header, styles.horiziontalMenu)}>
      <div className={classNames(styles.container, isContentFlowMode && styles.flowMode)}>
        <SiteDetail inlineLayout horizontalNavigator />
        <div className={styles.headerNav}>
          <TopMenu />
        </div>
        <div className={styles.rightPart}>
          <UserInfo />
          <SelectLang />
        </div>
      </div>
    </header>
  );

  return <>{isHorizontalNavigator ? HorizontalMenuHeader : VerticalMenuHeader}</>;
};
export default inject('layoutStore')(observer(Header));
