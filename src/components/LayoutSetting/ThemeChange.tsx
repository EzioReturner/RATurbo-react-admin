import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';
import { CheckOutlined } from '@ant-design/icons';
import { themeColors } from '@config/setting';

const ThemeChange: React.FC = () => {
  const [currentColor, setColor] = useState('#fb4491');
  const handleChangeTheme = (color: string) => {
    setColor(color);
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
  );
};

export default ThemeChange;
