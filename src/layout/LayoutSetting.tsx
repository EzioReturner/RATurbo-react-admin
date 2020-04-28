import React, { useState } from 'react';
import { SettingOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import styles from './mainLayout.module.scss';
import classNames from 'classnames';
import { Checkbox, Drawer } from 'antd';
import { observer, inject } from 'mobx-react';
import LayoutStore from '@store/layoutStore';
import ReactDOM from 'react-dom';

const LayoutSetting: React.FC = props => {
  const {
    layoutStore: { isHorizontalMenu }
  } = props as { layoutStore: LayoutStore };

  const [openSetting, setOpenSetting] = useState(false);

  const TarIcon = openSetting ? <CloseOutlined /> : <SettingOutlined />;

  return ReactDOM.createPortal(
    <>
      <div
        className={classNames(styles.settingIcon, openSetting && styles.openSetting)}
        onClick={() => setOpenSetting(!openSetting)}
      >
        {TarIcon}
      </div>
      <Drawer
        visible={openSetting}
        onClose={() => setOpenSetting(!openSetting)}
        width={300}
        className={styles.settingDrawer}
      >
        <div className={classNames(styles.settingContent, styles.navigateMode)}>
          <div className={styles.settingTitle}>导航风格</div>
          <img src={require('@assets/image/vertical.svg').default} alt="" />
          <img src={require('@assets/image/horizontal.svg').default} alt="" />
          <CheckOutlined
            className={classNames(
              styles.navigateSelectIcon,
              isHorizontalMenu && styles.isHorizontalMenu
            )}
          />
        </div>
        <div className={styles.settingContent}>
          <div className={styles.settingTitle}>导航风格</div>
        </div>
      </Drawer>
    </>,
    document.getElementsByTagName('body')[0]
  );
};

export default inject('layoutStore')(observer(LayoutSetting));
