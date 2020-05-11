import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';
import { CheckOutlined } from '@ant-design/icons';
import { themeColors } from '@config/setting';
import { message, Tooltip } from 'antd';
import LayoutStore from '@/store/layoutStore';
import { observer, inject } from 'mobx-react';

const ThemeChange: React.FC = props => {
  const [currentColor, setColor] = useState('#fb4491');
  const [currentTheme, setTheme] = useState<any>({});
  const {
    layoutStore: { isDarkTheme, setVisionTheme }
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
    setVisionTheme(theme);
    message.loading('正在应用视觉风格', 0.8);
    document.body.style.setProperty('--body-background', theme === 'dark' ? '#000000' : '#f3f3f3');
    document.body.style.setProperty(
      '--navigator-background',
      theme === 'dark' ? '#1f1f1f' : '#ffffff'
    );
    document.body.style.setProperty('--border-color', theme === 'dark' ? '#434343' : '#f2f2f2');
    document.body.style.setProperty(
      '--shadow-color',
      theme === 'dark' ? 'rgba(0, 0, 0, 0.45)' : 'rgba(189, 189, 189, 0.6)'
    );

    const _theme =
      theme === 'dark'
        ? {
            '@component-background': '#141414',
            '@text-color': 'fade(@white, 65%)',
            '@text-color-secondary': 'fade(@white, 45%)',
            '@text-color-inverse': '@white',
            '@icon-color-hover': 'fade(@white, 75%)',
            '@heading-color': 'fade(@white, 85%)',
            '@border-color-base': '#434343',
            '@border-color-split': '#303030'
          }
        : {
            '@component-background': '#ffffff',
            '@text-color': 'fade(@black, 65%)',
            '@text-color-secondary': 'fade(@black, 45%)',
            '@text-color-inverse': '@black',
            '@icon-color-hover': 'fade(@black, 75%)',
            '@heading-color': 'fade(@black, 85%)',
            '@border-color-base': 'hsv(0, 0, 85%)',
            '@border-color-split': 'hsv(0, 0, 94%)'
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
      <div className={classNames(styles.settingRow, styles.globalStyle)}>
        <div className={styles.settingTitle}>整体色彩模式</div>
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
          className={classNames(styles.selectedIcon, isDarkTheme && styles.rightPlace)}
        />
      </div>
      <div className={classNames(styles.settingRow, styles.themeChange)}>
        <div className={styles.settingTitle}>色彩风格</div>
        {themeColors?.map(c => (
          <div
            key={c}
            style={{ backgroundColor: c }}
            className={styles.colorBlock}
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
