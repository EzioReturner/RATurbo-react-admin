import React, { useState, useEffect, useRef } from 'react';
import { SettingOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import NavigateMode from './NavigateMode';
import ContentChange from './ContentChange';
import ThemeChange from './ThemeChange';

const LayoutSetting: React.FC = props => {
  let maskRef = useRef<HTMLElement>();
  useEffect(() => {
    maskRef.current = document.getElementById('raSettingMask') as HTMLElement;
  }, []);

  const [openSetting, setOpenSetting] = useState(false);

  const handleCloseMask = () => {
    setOpenSetting(false);
    if (maskRef.current) {
      maskRef.current.style.width = '100vw';
      setTimeout(() => {
        maskRef.current && (maskRef.current.style.width = '0');
      }, 400);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div
        className={classNames(styles.settingDrawer, openSetting && styles.opened)}
        id="raSettingMask"
      >
        <div
          className={classNames(styles.drawerMask, openSetting && styles.opened)}
          onClick={() => handleCloseMask()}
        ></div>
        <div className={styles.drawerWrapper}>
          <SettingOutlined
            className={styles.settingIcon}
            onClick={() => setOpenSetting(!openSetting)}
          />
          <div className={styles.drawerBody}>
            <CloseOutlined className={styles.closeIcon} onClick={() => setOpenSetting(false)} />
            <NavigateMode />
            <ContentChange />
            <ThemeChange />
          </div>
        </div>
      </div>
    </>,
    document.getElementsByTagName('body')[0]
  );
};

export default LayoutSetting;
