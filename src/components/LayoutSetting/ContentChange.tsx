import React from 'react';
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
      fixHeader,
      setLockHeaderScroll,
      fixSiderBar,
      setLockMenuScroll,
      showHeader,
      changeLayoutStatus,
      showMenu
    }
  } = props as { layoutStore: LayoutStore };

  const ContentBlock = (
    <div className={classNames('RA-setting-Row', 'RA-setting-contentControl')}>
      <div className="RA-setting-settingItem">
        <div className="RA-setting-settingItem-Label">内容区域宽度</div>
        <Select
          className="RA-setting-settingAction"
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
        <div className="RA-setting-settingItem">
          <div className="RA-setting-settingItem-Label">固定 Header</div>
          <Switch
            disabled={isInlineLayout}
            checked={fixHeader}
            defaultChecked
            onChange={setLockHeaderScroll}
          />
        </div>
      </Tooltip>
      <Tooltip placement="left" title={isHorizontalNavigator ? '仅在左侧导航模式下起效' : ''}>
        <div className="RA-setting-settingItem">
          <div className="RA-setting-settingItem-Label">固定侧边菜单</div>
          <Switch
            disabled={isHorizontalNavigator}
            checked={fixSiderBar}
            defaultChecked
            onChange={setLockMenuScroll}
          />
        </div>
      </Tooltip>
    </div>
  );

  const DisplayBlock = (
    <div
      className={classNames('RA-setting-Row', 'RA-setting-layoutControl')}
      style={{ marginBottom: 0 }}
    >
      <div className="RA-setting-title">内容控制</div>
      <div className="RA-setting-settingItem">
        <div className="RA-setting-settingItem-Label">显示 header</div>
        <Switch
          checked={showHeader}
          defaultChecked
          onChange={val => changeLayoutStatus('showHeader', val)}
        />
      </div>
      <Tooltip placement="left" title={isHorizontalNavigator ? '仅在左侧导航模式下起效' : ''}>
        <div className="RA-setting-settingItem">
          <div className="RA-setting-settingItem-Label">显示侧边菜单</div>
          <Switch
            disabled={isHorizontalNavigator}
            checked={showMenu}
            defaultChecked
            onChange={val => changeLayoutStatus('showMenu', val)}
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
