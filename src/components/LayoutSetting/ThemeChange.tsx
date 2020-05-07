import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import styles from './index.module.scss';

const ThemeChange: React.FC = props => {
  const handleChangeTheme = () => {
    window.less
      .modifyVars({
        '@primary-color': '#fb4491'
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
