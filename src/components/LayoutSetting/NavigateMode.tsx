import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import LayoutStore from '@/store/layoutStore';
import { observer, inject } from 'mobx-react';

const NavigateMode: React.FC = props => {
  const {
    layoutStore: { setNavigateMode, isHorizontalNavigator, setLayoutMode, isInlineLayout }
  } = props as { layoutStore: LayoutStore };
  return (
    <>
      <div className={classNames(styles.settingRow, styles.navigateMode)}>
        <div className={styles.settingTitle}>导航风格</div>
        <Tooltip placement="top" title={'左侧导航模式'}>
          <img
            onClick={() => setNavigateMode('vertical')}
            src={require('@assets/image/vertical.svg').default}
            alt=""
          />
        </Tooltip>
        <Tooltip placement="top" title={'顶部导航模式'}>
          <img
            onClick={() => setNavigateMode('horizontal')}
            src={require('@assets/image/horizontal.svg').default}
            alt=""
          />
        </Tooltip>
        <CheckOutlined
          className={classNames(styles.selectedIcon, isHorizontalNavigator && styles.rightPlace)}
        />
      </div>
      <div
        className={classNames(
          styles.settingRow,
          styles.layoutMode,
          isHorizontalNavigator && styles.disabled
        )}
      >
        <div className={styles.settingTitle}>布局模式</div>
        <Tooltip
          placement="top"
          title={isHorizontalNavigator ? '仅在左侧导航模式下起效' : '分列式布局'}
        >
          <img
            onClick={() => (isHorizontalNavigator ? {} : setLayoutMode('split'))}
            src={require('@assets/image/split.svg').default}
            alt=""
          />
        </Tooltip>
        <Tooltip
          placement="top"
          title={isHorizontalNavigator ? '仅在左侧导航模式下起效' : '一体式布局'}
        >
          <img
            onClick={() => (isHorizontalNavigator ? {} : setLayoutMode('inline'))}
            src={require('@assets/image/inline.svg').default}
            alt=""
          />
        </Tooltip>
        {!isHorizontalNavigator && (
          <CheckOutlined
            className={classNames(styles.selectedIcon, isInlineLayout && styles.rightPlace)}
          />
        )}
      </div>
    </>
  );
};

export default inject('layoutStore')(observer(NavigateMode));
