import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import SelectLang from './SelectLang';
import UserInfo from './UserInfo';
import LayoutStore from '@store/layoutStore';
import SiteDetail from './SiteDetail';
import TopMenu from './SiderMenu';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { usei18n } from '@config/setting';
import { LayoutProps } from './types';

interface InjectedProps {
  layoutStore: LayoutStore;
}

const Header: React.FC<LayoutProps> = props => {
  const {
    layoutStore: { isInlineLayout, isHorizontalNavigator, isContentFlowMode }
  } = props as InjectedProps;

  const { siderBar: _siderBar, siteLogo: _siteLogo } = props;

  const VerticalMenuHeaderBody = (
    <>
      {isInlineLayout && (_siteLogo || <SiteDetail />)}
      <div className="RA-header-rightPlace">
        <UserInfo />
        {usei18n && <SelectLang />}
      </div>
    </>
  );

  const VerticalMenuHeader = (
    <div className="RA-header">{VerticalMenuHeaderBody}</div>
  );

  const HorizontalMenuHeader = (
    <div className={classNames('RA-header', 'RA-header-horizontal')}>
      <div
        className={classNames(
          'RA-header-container',
          isContentFlowMode && 'RA-header-container-flowMode'
        )}
      >
        {_siteLogo || <SiteDetail />}
        <div className="RA-header-headerNav">
          {<TopMenu siderBar={_siderBar} />}
        </div>
        <div className="RA-header-rightPlace">
          <UserInfo />
          {usei18n && <SelectLang />}
        </div>
      </div>
    </div>
  );

  return (
    <>{isHorizontalNavigator ? HorizontalMenuHeader : VerticalMenuHeader}</>
  );
};
export default inject('layoutStore')(observer(Header));
