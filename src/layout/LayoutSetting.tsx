import React, { useState } from 'react';
import { SettingOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './layoutSetting.module.scss';
import classNames from 'classnames';
import { Checkbox, Drawer, Radio, Tooltip } from 'antd';
import { observer, inject } from 'mobx-react';
import LayoutStore from '@store/layoutStore';
import ReactDOM from 'react-dom';

const LayoutSetting: React.FC = props => {
  const {
    layoutStore: { isHorizontalMenu, setNavigateMode, isInlineLayout, setLayoutMode }
  } = props as { layoutStore: LayoutStore };

  const [openSetting, setOpenSetting] = useState(false);

  const TarIcon = openSetting ? <CloseOutlined /> : <SettingOutlined />;

  const NavigateMode = (
    <div className={classNames(styles.settingContent, styles.navigateMode)}>
      <div className={styles.settingTitle}>导航风格</div>
      <Tooltip placement="top" title={'左侧导航模式'}>
        <img
          onClick={() => setNavigateMode('vertical')}
          src={require('@assets/image/vertical.svg').default}
          alt=""
        />
      </Tooltip>
      <Tooltip placement="top" title={'顶部导航模式'}>
        <img
          onClick={() => setNavigateMode('horizontal')}
          src={require('@assets/image/horizontal.svg').default}
          alt=""
        />
      </Tooltip>
      <CheckOutlined
        className={classNames(styles.selectedIcon, isHorizontalMenu && styles.rightPlace)}
      />
    </div>
  );

  const LayoutMode = (
    <div
      className={classNames(
        styles.settingContent,
        styles.layoutMode,
        isHorizontalMenu && styles.disabled
      )}
    >
      <div className={styles.settingTitle}>布局模式</div>
      <Tooltip placement="top" title={isHorizontalMenu ? '仅在左侧导航模式下起效' : '分列式布局'}>
        <img
          onClick={() => (isHorizontalMenu ? {} : setLayoutMode('split'))}
          src={require('@assets/image/split.svg').default}
          alt=""
        />
      </Tooltip>
      <Tooltip placement="top" title={isHorizontalMenu ? '仅在左侧导航模式下起效' : '一体式布局'}>
        <img
          onClick={() => (isHorizontalMenu ? {} : setLayoutMode('inline'))}
          src={require('@assets/image/inline.svg').default}
          alt=""
        />
      </Tooltip>
      {!isHorizontalMenu && (
        <CheckOutlined
          className={classNames(styles.selectedIcon, isInlineLayout && styles.rightPlace)}
        />
      )}
    </div>
  );

  return ReactDOM.createPortal(
    <>
      <div
        className={classNames(styles.settingIcon, openSetting && styles.openSetting)}
        onClick={() => setOpenSetting(!openSetting)}
      >
        {TarIcon}
      </div>
      <Drawer
        visible={openSetting}
        onClose={() => setOpenSetting(!openSetting)}
        width={300}
        className={styles.settingDrawer}
      >
        {NavigateMode}
        {LayoutMode}
      </Drawer>
    </>,
    document.getElementsByTagName('body')[0]
  );
};

export default inject('layoutStore')(observer(LayoutSetting));
