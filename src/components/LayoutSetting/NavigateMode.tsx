import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import LayoutStore from '@/store/layoutStore';
import { observer, inject } from 'mobx-react';

const NavigateMode: React.FC = props => {
  const {
    layoutStore: { isHorizontalNavigator, isInlineLayout, changeLayoutStatus }
  } = props as { layoutStore: LayoutStore };
  return (
    <>
      <div className={classNames(styles.settingRow, styles.navigateMode)}>
        <div className={styles.settingTitle}>导航风格</div>
        <Tooltip placement="top" title={'左侧导航模式'}>
          <img
            onClick={() => changeLayoutStatus('navigateMode', 'vertical')}
            src={require('@assets/image/setting/vertical.svg').default}
            alt=""
          />
        </Tooltip>
        <Tooltip placement="top" title={'顶部导航模式'}>
          <img
            onClick={() => changeLayoutStatus('navigateMode', 'horizontal')}
            src={require('@assets/image/setting/horizontal.svg').default}
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
            onClick={() => (isHorizontalNavigator ? {} : changeLayoutStatus('layoutMode', 'split'))}
            src={require('@assets/image/setting/split.svg').default}
            alt=""
          />
        </Tooltip>
        <Tooltip
          placement="top"
          title={isHorizontalNavigator ? '仅在左侧导航模式下起效' : '一体式布局'}
        >
          <img
            onClick={() =>
              isHorizontalNavigator ? {} : changeLayoutStatus('layoutMode', 'inline')
            }
            src={require('@assets/image/setting/inline.svg').default}
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
