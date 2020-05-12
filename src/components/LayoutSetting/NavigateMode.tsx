import React from 'react';
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
      <div className={classNames('RA-setting-Row', 'RA-setting-haveSelectedIcon')}>
        <div className="RA-setting-title">导航风格</div>
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
          className={classNames(
            'RA-setting-selectedIcon',
            isHorizontalNavigator && 'RA-setting-selectedIcon-rightPlace'
          )}
        />
      </div>
      <div
        className={classNames(
          'RA-setting-Row',
          'RA-setting-layoutMode',
          'RA-setting-haveSelectedIcon',
          isHorizontalNavigator && 'RA-setting-layoutMode-disabled'
        )}
      >
        <div className="RA-setting-title">布局模式</div>
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
            className={classNames(
              'RA-setting-selectedIcon',
              isInlineLayout && 'RA-setting-selectedIcon-rightPlace'
            )}
          />
        )}
      </div>
    </>
  );
};

export default inject('layoutStore')(observer(NavigateMode));
