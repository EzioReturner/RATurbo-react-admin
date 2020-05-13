import React, { useState } from 'react';
import classNames from 'classnames';
import { CheckOutlined } from '@ant-design/icons';
import { themeColors } from '@config/setting';
import { message, Tooltip } from 'antd';
import LayoutStore from '@/store/layoutStore';
import { observer, inject } from 'mobx-react';
import cloneDeep from 'lodash/cloneDeep';

const ThemeChange: React.FC = props => {
  const [currentColor, setColor] = useState('#fb4491');
  const [currentTheme, setTheme] = useState<any>({});
  const {
    layoutStore: { isDarkTheme, changeLayoutStatus }
  } = props as { layoutStore: LayoutStore };

  const handleChangeTheme = (color: string) => {
    setColor(color);
    message.loading('正在加载主题', 0.8);
    window.less
      .modifyVars({
        '@primary-color': color,
        ...currentTheme
      })
      .then(() => {
        console.log('sussess');
      });
  };

  const handleChangeVision = (theme: 'light' | 'dark') => {
    changeLayoutStatus('visionTheme', theme);
    message.loading('正在应用视觉风格', 0.8);
    document.body.style.setProperty('--body-background', theme === 'dark' ? '#0a0a0a' : '#f3f3f3');
    document.body.style.setProperty(
      '--navigator-background',
      theme === 'dark' ? '#222222' : '#ffffff'
    );
    document.body.style.setProperty(
      '--popover-background',
      theme === 'dark' ? '#141414' : '#ffffff'
    );
    document.body.style.setProperty('--border-color', theme === 'dark' ? '#434343' : '#f2f2f2');
    document.body.style.setProperty(
      '--shadow-color',
      theme === 'dark' ? 'rgba(0, 0, 0, 0.45)' : 'rgba(189, 189, 189, 0.6)'
    );
    const _className = ['darkTheme', 'lightTheme'].reduce((total: string, key: string) => {
      if (total.indexOf(key) >= 0) {
        total = total.replace(key, '');
      }

      return total;
    }, cloneDeep(document.body.className));

    document.body.className = (_className + ` ${theme}Theme`).trim();

    const _theme =
      theme === 'dark'
        ? {
            '@component-background': '#1d1d1d',
            '@text-color': 'fade(@white, 65%)',
            '@text-color-secondary': 'fade(@white, 45%)',
            '@text-color-inverse': '@white',
            '@icon-color-hover': 'fade(@white, 75%)',
            '@heading-color': 'fade(@white, 85%)',
            '@disabled-color': 'fade(@white, 30%)',
            '@border-color-base': '#434343',
            '@border-color-split': '#303030',
            '@popover-background': '#1d1d1d',
            '@popover-customize-border-color': '#3a3a3a',
            '@select-selection-item-bg': 'hsv(0, 0, 96%)',
            '@item-hover-bg': 'fade(@white, 8%)',
            '@background-color-light': 'fade(@white, 4%)',
            '@background-color-base': 'fade(@white, 8%)'
          }
        : {
            '@component-background': '#ffffff',
            '@text-color': 'fade(@black, 65%)',
            '@text-color-secondary': 'fade(@black, 45%)',
            '@text-color-inverse': '@black',
            '@icon-color-hover': 'fade(@black, 75%)',
            '@heading-color': 'fade(@black, 85%)',
            '@disabled-color': 'fade(#000000, 30%)',
            '@border-color-base': 'hsv(0, 0, 85%)',
            '@border-color-split': 'hsv(0, 0, 94%)',
            '@popover-background': '#ffffff',
            '@popover-customize-border-color': 'hsv(0, 0, 94%)',
            '@select-selection-item-bg': 'fade(@white, 8)',
            '@item-hover-bg': '#f5f5f5',
            '@background-color-light': 'hsv(0, 0, 98%)',
            '@background-color-base': 'hsv(0, 0, 96%)'
          };
    setTheme(_theme);
    window.less
      .modifyVars({
        '@primary-color': currentColor,
        ..._theme
      })
      .then(() => {
        console.log('sussess');
      });
  };

  return (
    <>
      <div className={classNames('RA-setting-Row', 'RA-setting-haveSelectedIcon')}>
        <div className="RA-setting-title">整体色彩模式</div>
        <Tooltip placement="top" title={'亮色模式'}>
          <img
            src={require('@assets/image/setting/light.svg').default}
            alt=""
            onClick={() => handleChangeVision('light')}
          />
        </Tooltip>
        <Tooltip placement="top" title={'暗黑模式'}>
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
        <div className="RA-setting-title">色彩风格</div>
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

export default inject('layoutStore')(observer(ThemeChange));
