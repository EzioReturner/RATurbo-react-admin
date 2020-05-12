import React from 'react';
import { siteName, menuLinkUrl, useSiteIcon } from '@config/setting';
import classNames from 'classnames';

const SiteDetail: React.FC<{
  inlineLayout: boolean;
  horizontalNavigator?: boolean;
  darkTheme?: boolean;
  collapsed?: boolean;
}> = props => {
  return (
    <a
      className={classNames(
        'RA-siteDetail',
        props.inlineLayout && 'RA-siteDetail-inlineLayout',
        props.horizontalNavigator && 'RA-siteDetail-horizontal',
        props.darkTheme && 'RA-siteDetail-darkTheme',
        props.collapsed && 'RA-siteDetail-collapsed'
      )}
      href={menuLinkUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {useSiteIcon && (
        <img
          alt=""
          src={require('@assets/image/logo.png').default}
          className="RA-siteDetail-logo"
        />
      )}
      <span className="RA-siteDetail-title">{siteName}</span>
    </a>
  );
};

export default SiteDetail;
