import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Tooltip, Select, Switch } from 'antd';
import LayoutStore from '@/store/layoutStore';
import { observer, inject } from 'mobx-react';

const ContentChange: React.FC = props => {
  const {
    layoutStore: {
      contentAreaWidthMode,
      isHorizontalNavigator,
      setContentFlowMode,
      isInlineLayout,
      lockHeaderScroll,
      setLockHeaderScroll,
      lockMenuScroll,
      setLockMenuScroll,
      showHeader,
      setShowHeader,
      showMenu,
      setShowMenu
    }
  } = props as { layoutStore: LayoutStore };

  const ContentBlock = (
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
      <Tooltip placement="left" title={isInlineLayout ? '仅在分裂布局下起效' : ''}>
        <div className={styles.settingItem}>
          <div className={styles.settingLabel}>固定 Header</div>
          <Switch
            disabled={isInlineLayout}
            checked={lockHeaderScroll}
            defaultChecked
            onChange={setLockHeaderScroll}
          />
        </div>
      </Tooltip>
      <Tooltip placement="left" title={isHorizontalNavigator ? '仅在左侧导航模式下起效' : ''}>
        <div className={styles.settingItem}>
          <div className={styles.settingLabel}>固定侧边菜单</div>
          <Switch
            disabled={isHorizontalNavigator}
            checked={lockMenuScroll}
            defaultChecked
            onChange={setLockMenuScroll}
          />
        </div>
      </Tooltip>
    </div>
  );

  const DisplayBlock = (
    <div className={classNames(styles.settingRow, styles.layoutControl)}>
      <div className={styles.settingTitle}>内容控制</div>
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>显示 header</div>
        <Switch checked={showHeader} defaultChecked onChange={setShowHeader} />
      </div>
      <Tooltip placement="left" title={isHorizontalNavigator ? '仅在左侧导航模式下起效' : ''}>
        <div className={styles.settingItem}>
          <div className={styles.settingLabel}>显示侧边菜单</div>
          <Switch
            disabled={isHorizontalNavigator}
            checked={showMenu}
            defaultChecked
            onChange={setShowMenu}
          />
        </div>
      </Tooltip>
    </div>
  );

  return (
    <>
      {DisplayBlock}
      {ContentBlock}
    </>
  );
};

export default inject('layoutStore')(observer(ContentChange));
