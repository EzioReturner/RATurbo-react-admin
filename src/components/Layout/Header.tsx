import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import SelectLang from '../SelectLang';
import styles from './header.module.scss';
import UserInfo from './UserInfo';
import LayoutStore from '@store/layoutStore';
import SiteDetail from './SiteDetail';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
interface InjectedProps {
  layoutStore: LayoutStore;
}

const Header: React.FC = props => {
  const {
    layoutStore: { toggleCollapsed, collapsed, isMobile, showMenu, isInlineLayout }
  } = props as InjectedProps;

  const iconCollapsed = collapsed ? (
    <MenuUnfoldOutlined className={styles.foldIcon} onClick={() => toggleCollapsed()} />
  ) : (
    <MenuFoldOutlined className={styles.foldIcon} onClick={() => toggleCollapsed()} />
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
      {isInlineLayout && <SiteDetail isInlineLayout={isInlineLayout} />}
      {showMenu && !isInlineLayout && iconCollapsed}
      <div className={styles.rightPart}>
        <UserInfo />
        <SelectLang />
      </div>
    </header>
  );
};
export default inject('layoutStore')(observer(Header));
