import React, { useState, useEffect, useRef } from 'react';
import { SettingOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import NavigateMode from './NavigateMode';
import ContentChange from './ContentChange';
import ThemeChange from './ThemeChange';
import { Divider } from 'antd';
import './styles/index.less';

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
        className={classNames('RA-setting-drawer', openSetting && 'RA-setting-drawe-opened')}
        id="raSettingMask"
      >
        <div className="RA-setting-drawer-mask" onClick={() => handleCloseMask()}></div>
        <div className="RA-setting-drawer-wrapper">
          <SettingOutlined
            className="RA-setting-icon"
            onClick={() => setOpenSetting(!openSetting)}
          />
          <div className="RA-setting-drawer-body">
            <CloseOutlined
              className="RA-setting-drawer-closeIcon"
              onClick={() => setOpenSetting(false)}
            />
            <ThemeChange />
            <Divider />
            <NavigateMode />
            <Divider />
            <ContentChange />
          </div>
        </div>
      </div>
    </>,
    document.getElementsByTagName('body')[0]
  );
};

export default LayoutSetting;
