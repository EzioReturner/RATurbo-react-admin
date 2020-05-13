import React from 'react';
import classNames from 'classnames';
import { Tooltip, Select, Switch } from 'antd';
import LayoutStore from '@/store/layoutStore';
import { observer, inject } from 'mobx-react';
import LocaleStore from '@store/localeStore';

const ContentChange: React.FC = props => {
  const {
    layoutStore: {
      isHorizontalNavigator,
      isInlineLayout,
      changeLayoutStatus,
      layoutStatus: { showSiderBar, showHeader, fixSiderBar, fixHeader, contentAreaWidthMode }
    },
    localeStore: { localeObj }
  } = props as { layoutStore: LayoutStore; localeStore: LocaleStore };

  const ContentBlock = (
    <div className={classNames('RA-setting-Row', 'RA-setting-contentControl')}>
      <div className="RA-setting-settingItem">
        <div className="RA-setting-settingItem-Label">
          {localeObj['layoutSetting.contentWidth'] || '内容区域宽度'}
        </div>
        <Select
          className="RA-setting-settingAction"
          value={contentAreaWidthMode}
          style={{ width: 120 }}
          size="small"
          onChange={val => changeLayoutStatus('contentAreaWidthMode', val as 'flow' | 'max-width')}
        >
          <Select.Option value="flow">
            {localeObj['layoutSetting.flowContent'] || '流式'}
          </Select.Option>
          <Select.Option value="max-width" disabled={!isHorizontalNavigator}>
            {localeObj['layoutSetting.maxWidth'] || '定宽'}
          </Select.Option>
        </Select>
      </div>
      <Tooltip
        placement="left"
        title={
          isInlineLayout ? localeObj['layoutSetting.splitModeOnly'] || '仅在分列布局下起效' : ''
        }
      >
        <div className="RA-setting-settingItem">
          <div className="RA-setting-settingItem-Label">
            {localeObj['layoutSetting.fixHeader'] || '固定 Header'}
          </div>
          <Switch
            disabled={isInlineLayout}
            checked={fixHeader}
            defaultChecked
            onChange={val => changeLayoutStatus('fixHeader', val)}
          />
        </div>
      </Tooltip>
      <Tooltip
        placement="left"
        title={
          isHorizontalNavigator
            ? localeObj['layoutSetting.verticalNavOnly'] || '仅在左侧导航模式下起效'
            : ''
        }
      >
        <div className="RA-setting-settingItem">
          <div className="RA-setting-settingItem-Label">
            {localeObj['layoutSetting.fixSiderBar'] || '固定侧边菜单'}
          </div>
          <Switch
            disabled={isHorizontalNavigator}
            checked={fixSiderBar}
            defaultChecked
            onChange={val => changeLayoutStatus('fixSiderBar', val)}
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
      <div className="RA-setting-title">
        {localeObj['layoutSetting.contentSetting'] || '内容控制'}
      </div>
      <div className="RA-setting-settingItem">
        <div className="RA-setting-settingItem-Label">
          {localeObj['layoutSetting.showHeader'] || '显示 header'}
        </div>
        <Switch
          checked={showHeader}
          defaultChecked
          onChange={val => changeLayoutStatus('showHeader', val)}
        />
      </div>
      <Tooltip
        placement="left"
        title={
          isHorizontalNavigator
            ? localeObj['layoutSetting.verticalNavOnly'] || '仅在左侧导航模式下起效'
            : ''
        }
      >
        <div className="RA-setting-settingItem">
          <div className="RA-setting-settingItem-Label">
            {localeObj['layoutSetting.showSiderBar'] || '显示侧边菜单'}
          </div>
          <Switch
            disabled={isHorizontalNavigator}
            checked={showSiderBar}
            defaultChecked
            onChange={val => changeLayoutStatus('showSiderBar', val)}
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

export default inject('layoutStore', 'localeStore')(observer(ContentChange));
