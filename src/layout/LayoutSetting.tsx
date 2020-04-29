import React, { useState } from 'react';
import { SettingOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './layoutSetting.module.scss';
import classNames from 'classnames';
import { Drawer, Radio, Tooltip, Select, Switch } from 'antd';
import { observer, inject } from 'mobx-react';
import LayoutStore from '@store/layoutStore';
import ReactDOM from 'react-dom';

const LayoutSetting: React.FC = props => {
  const {
    layoutStore: {
      isHorizontalNavigator,
      setNavigateMode,
      isInlineLayout,
      setLayoutMode,
      setContentFlowMode,
      contentAreaWidthMode
    }
  } = props as { layoutStore: LayoutStore };

  const [openSetting, setOpenSetting] = useState(false);

  const TarIcon = openSetting ? <CloseOutlined /> : <SettingOutlined />;

  const NavigateMode = (
    <div className={classNames(styles.settingRow, styles.navigateMode)}>
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
        className={classNames(styles.selectedIcon, isHorizontalNavigator && styles.rightPlace)}
      />
    </div>
  );

  const LayoutMode = (
    <div
      className={classNames(
        styles.settingRow,
        styles.layoutMode,
        isHorizontalNavigator && styles.disabled
      )}
    >
      <div className={styles.settingTitle}>布局模式</div>
      <Tooltip
        placement="top"
        title={isHorizontalNavigator ? '仅在左侧导航模式下起效' : '分列式布局'}
      >
        <img
          onClick={() => (isHorizontalNavigator ? {} : setLayoutMode('split'))}
          src={require('@assets/image/split.svg').default}
          alt=""
        />
      </Tooltip>
      <Tooltip
        placement="top"
        title={isHorizontalNavigator ? '仅在左侧导航模式下起效' : '一体式布局'}
      >
        <img
          onClick={() => (isHorizontalNavigator ? {} : setLayoutMode('inline'))}
          src={require('@assets/image/inline.svg').default}
          alt=""
        />
      </Tooltip>
      {!isHorizontalNavigator && (
        <CheckOutlined
          className={classNames(styles.selectedIcon, isInlineLayout && styles.rightPlace)}
        />
      )}
    </div>
  );

  const ContentSetting = (
    <div className={classNames(styles.settingRow, styles.contentSetting)}>
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>内容区域宽度</div>
        <Select
          className={styles.settingAction}
          value={contentAreaWidthMode}
          style={{ width: 120 }}
          size="small"
          onChange={val => setContentFlowMode(val as 'flow' | 'max-width')}
        >
          <Select.Option value="flow">流式</Select.Option>
          <Select.Option value="max-width" disabled={!isHorizontalNavigator}>
            定宽
          </Select.Option>
        </Select>
      </div>
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>固定 Header</div>
        <Switch defaultChecked onChange={val => {}} />
      </div>
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>固定侧边菜单</div>
        <Switch defaultChecked onChange={val => {}} />
      </div>
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
        {ContentSetting}
        {LayoutMode}
      </Drawer>
    </>,
    document.getElementsByTagName('body')[0]
  );
};

export default inject('layoutStore')(observer(LayoutSetting));
