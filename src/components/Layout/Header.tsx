import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import SelectLang from '../SelectLang';
import styles from './header.module.scss';
import UserInfo from './UserInfo';
import LayoutStore from '@store/layoutStore';
import SiteDetail from './SiteDetail';
import { layoutMode } from '@config/setting';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
interface InjectedProps {
  layoutStore: LayoutStore;
}

const Header: React.FC = props => {
  const injected = () => {
    return props as InjectedProps;
  };
  const {
    layoutStore: { toggleCollapsed, collapsed, isMobile, showMenu }
  } = injected();

  const iconCollapsed = collapsed ? (
    <MenuUnfoldOutlined className={styles.foldIcon} onClick={() => toggleCollapsed()} />
  ) : (
    <MenuFoldOutlined className={styles.foldIcon} onClick={() => toggleCollapsed()} />
  );

  const inlineLayout = layoutMode === 'inlineLayout';

  return (
    <header
      className={classNames(
        styles.header,
        collapsed && styles.collapsed,
        isMobile && styles.isMobile,
        !showMenu && styles.withoutMenu,
        inlineLayout && styles.inlineLayout
      )}
    >
      {inlineLayout && <SiteDetail />}
      {showMenu && !inlineLayout && iconCollapsed}
      <div className={styles.rightPart}>
        <UserInfo />
        <SelectLang />
      </div>
    </header>
  );
};
export default inject('layoutStore')(observer(Header));
