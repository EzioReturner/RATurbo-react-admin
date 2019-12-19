import React from 'react';
import { Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import SelectLang from '../SelectLang';
import styles from './header.module.scss';
import UserInfo from './UserInfo';
import LayoutStore from '@store/layoutStore';
interface InjectedProps {
  layoutStore: LayoutStore;
}

const Header: React.FC = props => {
  const injected = () => {
    return props as InjectedProps;
  };
  const {
    layoutStore: { toggleCollapsed, collapsed, isMobile }
  } = injected();

  const iconCollapsed = collapsed ? 'menu-unfold' : 'menu-fold';
  return (
    <header
      className={classNames(
        styles.header,
        collapsed ? styles.collapsed : '',
        isMobile ? styles.isMobile : ''
      )}
    >
      <Icon type={iconCollapsed} className={styles.foldIcon} onClick={() => toggleCollapsed()} />
      <div className={styles.rightPart}>
        <UserInfo />
        <SelectLang />
      </div>
    </header>
  );
};
export default inject('layoutStore')(observer(Header));
