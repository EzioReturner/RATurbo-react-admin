import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import styles from './mainLayout.module.scss';
import classNames from 'classnames';
import { Checkbox } from 'antd';

interface LayoutSettingProps {
  setShowHeader: Function;
  setShowMenu: Function;
}

const LayoutSetting: React.FC<LayoutSettingProps> = props => {
  const { setShowHeader, setShowMenu } = props;

  const [openSetting, setOpenSetting] = useState(false);

  return (
    <div className={classNames(styles.layoutSetting, openSetting && styles.openSetting)}>
      <SettingOutlined
        className={styles.settingIcon}
        onClick={() => setOpenSetting(!openSetting)}
      />
      <div className={styles.layoutSettingPanel}>
        <Checkbox
          id="setting_setShowHeader"
          defaultChecked
          onChange={e => setShowHeader(e.target.checked)}
        >
          show header
        </Checkbox>
        <Checkbox
          id="setting_setShowMenu"
          defaultChecked
          onChange={e => setShowMenu(e.target.checked)}
        >
          show menu
        </Checkbox>
      </div>
    </div>
  );
};

export default LayoutSetting;
