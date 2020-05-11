import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';
import { CheckOutlined } from '@ant-design/icons';
import { themeColors } from '@config/setting';
import { message, Tooltip } from 'antd';

const ThemeChange: React.FC = () => {
  const [currentColor, setColor] = useState('#fb4491');
  const handleChangeTheme = (color: string) => {
    setColor(color);
    message.loading('正在加载主题', 0.8);
    document.body.style.setProperty('--primary', color);
    window.less
      .modifyVars({
        '@primary-color': color
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
          <img src={require('@assets/image/setting/light.svg').default} alt="" />
        </Tooltip>
        <Tooltip placement="top" title={'暗黑模式'}>
          <img src={require('@assets/image/setting/dark.svg').default} alt="" />
        </Tooltip>
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

export default ThemeChange;
