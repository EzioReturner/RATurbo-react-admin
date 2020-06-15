import React from 'react';
import { siteName, menuLinkUrl, useSiteIcon } from '@config/setting';
import classNames from 'classnames';
import LayoutStore from '@store/layoutStore';
import { observer, inject } from 'mobx-react';
import { RLogo } from '@components/SvgIcon';

const SiteDetail: React.FC = props => {
  const {
    layoutStore: {
      layoutStatus: { darkTheme, collapsed, currentColor },
      isInlineLayout,
      isHorizontalNavigator
    }
  } = props as { layoutStore: LayoutStore };
  return (
    <a
      className={classNames(
        'RA-siteDetail',
        isInlineLayout && 'RA-siteDetail-inlineLayout',
        isHorizontalNavigator && 'RA-siteDetail-horizontal',
        darkTheme && 'RA-siteDetail-darkTheme',
        collapsed && !isInlineLayout && 'RA-siteDetail-collapsed'
      )}
      href={menuLinkUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {useSiteIcon ? (
        <img
          alt=""
          src={require('@assets/image/logo.png').default}
          className="RA-siteDetail-logo"
        />
      ) : (
        <div className="RA-siteLogo">
          <div className="RA-siteLogo-border"></div>
          <div className="RA-siteLogo-logo">{RLogo(currentColor)}</div>
        </div>
      )}
      <span className="RA-siteDetail-title">{siteName}</span>
    </a>
  );
};

export default inject('layoutStore')(observer(SiteDetail));
