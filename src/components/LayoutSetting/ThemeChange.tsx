import React from 'react';
import classNames from 'classnames';
import { CheckOutlined } from '@ant-design/icons';
import { themeColors } from '@config/setting';
import { message, Tooltip } from 'antd';
import LayoutStore from '@/store/layoutStore';
import { observer, inject } from 'mobx-react';
import LocaleStore from '@store/localeStore';

const ThemeChange: React.FC = props => {
  const {
    layoutStore: {
      isDarkTheme,
      changeLayoutStatus,
      layoutStatus: { currentColor }
    },
    localeStore: { localeObj }
  } = props as { layoutStore: LayoutStore; localeStore: LocaleStore };

  const handleChangeTheme = (color: string) => {
    changeLayoutStatus('currentColor', color);
    message.loading('正在加载主题', 1.4);
  };

  const handleChangeVision = (theme: 'light' | 'dark') => {
    changeLayoutStatus('visionTheme', theme);
    message.loading('正在应用视觉风格', 1.4);
  };

  return (
    <>
      <div className={classNames('RA-setting-Row', 'RA-setting-haveSelectedIcon')}>
        <div className="RA-setting-title">
          {localeObj['layoutSetting.visionTheme'] || '整体色彩模式'}
        </div>
        <Tooltip placement="top" title={localeObj['layoutSetting.lightTheme'] || '亮色模式'}>
          <img
            src={require('@assets/image/setting/light.svg').default}
            alt=""
            onClick={() => handleChangeVision('light')}
          />
        </Tooltip>
        <Tooltip placement="top" title={localeObj['layoutSetting.darkTheme'] || '暗黑模式'}>
          <img
            src={require('@assets/image/setting/dark.svg').default}
            alt=""
            onClick={() => handleChangeVision('dark')}
          />
        </Tooltip>
        <CheckOutlined
          className={classNames(
            'RA-setting-selectedIcon',
            isDarkTheme && 'RA-setting-selectedIcon-rightPlace'
          )}
        />
      </div>
      <div className={classNames('RA-setting-Row', 'RA-setting-themeChange')}>
        <div className="RA-setting-title">
          {localeObj['layoutSetting.colorStyle'] || '色彩风格'}
        </div>
        {themeColors?.map(c => (
          <div
            key={c}
            style={{ backgroundColor: c }}
            className="RA-setting-themeChange-colorBlock"
            onClick={() => handleChangeTheme(c)}
          >
            {currentColor === c && <CheckOutlined />}
          </div>
        ))}
      </div>
    </>
  );
};

export default inject('layoutStore', 'localeStore')(observer(ThemeChange));
