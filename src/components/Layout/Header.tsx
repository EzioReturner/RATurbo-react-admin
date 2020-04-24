import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import SelectLang from '../SelectLang';
import styles from './header.module.scss';
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
      isNavigateLeftMode
    }
  } = props as InjectedProps;

  const IconCollapsed = collapsed ? (
    <MenuUnfoldOutlined className={styles.foldIcon} onClick={() => toggleCollapsed()} />
  ) : (
    <MenuFoldOutlined className={styles.foldIcon} onClick={() => toggleCollapsed()} />
  );

  const HeaderBody = (
    <>
      {isInlineLayout && (
        <SiteDetail isInlineLayout={isInlineLayout} isNavigateLeftMode={isNavigateLeftMode} />
      )}
      {showMenu && !isInlineLayout && IconCollapsed}
      {!isNavigateLeftMode && (
        <div className={styles.headerNav}>
          <TopMenu />
        </div>
      )}
      <div className={styles.rightPart}>
        <UserInfo />
        <SelectLang />
      </div>
    </>
  );

  return (
    <header
      className={classNames(
        styles.header,
        collapsed && styles.collapsed,
        isMobile && styles.isMobile,
        !showMenu && styles.withoutMenu,
        isInlineLayout && styles.inlineLayout
      )}
    >
      {isNavigateLeftMode ? (
        HeaderBody
      ) : (
        <div className={styles.topNavModeHeader}>{HeaderBody}</div>
      )}
    </header>
  );
};
export default inject('layoutStore')(observer(Header));
