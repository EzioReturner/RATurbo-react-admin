import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import styles from './index.module.scss';

// #f0b041, #e96033, #57bfc1, #54bf99, #63a7c9, #4090f7

const ThemeChange: React.FC = props => {
  const handleChangeTheme = () => {
    document.body.style.setProperty('--primary', '#54bf99');

    window.less
      .modifyVars({
        '@primary-color': '#54bf99'
      })
      .then(() => {
        console.log('sussess');
      });
  };

  return (
    <div className={classNames(styles.settingRow, styles.themeChange)}>
      <Button type="primary" onClick={handleChangeTheme}>
        换
      </Button>
    </div>
  );
};

export default ThemeChange;
