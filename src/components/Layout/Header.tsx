import React from 'react';
import { Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import SelectLang from '../SelectLang';
import styles from './header.module.scss';
import UserInfo from './UserInfo';
import LayoutStore from '@store/layoutStore';
import SiteDetail from './SiteDetail';
import { inlineHeader } from '@config/setting';
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

  const iconCollapsed = collapsed ? 'menu-unfold' : 'menu-fold';
  return (
    <header
      className={classNames(
        styles.header,
        collapsed && styles.collapsed,
        isMobile && styles.isMobile,
        !showMenu && styles.withoutMenu,
        inlineHeader && styles.inlineHeader
      )}
    >
      {inlineHeader && <SiteDetail />}
      {showMenu && !inlineHeader && (
        <Icon type={iconCollapsed} className={styles.foldIcon} onClick={() => toggleCollapsed()} />
      )}
      <div className={styles.rightPart}>
        <UserInfo />
        <SelectLang />
      </div>
    </header>
  );
};
export default inject('layoutStore')(observer(Header));
