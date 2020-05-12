import React from 'react';
import styles from './siderMenu.module.less';
import { siteName, menuLinkUrl, useSiteIcon } from '@config/setting';
import classNames from 'classnames';

const SiteDetail: React.FC<{
  isInlineLayout: boolean;
  isHorizontalNavigator?: boolean;
  isDarkTheme?: boolean;
}> = props => {
  return (
    <a
      className={classNames(
        styles.siteDetail,
        props.isInlineLayout && styles.inlineLayout,
        props.isHorizontalNavigator && styles.horizontal,
        props.isDarkTheme && styles.darkTheme
      )}
      href={menuLinkUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {useSiteIcon && (
        <img alt="" src={require('@assets/image/logo.png').default} className={styles.logo} />
      )}
      <span className={styles.title}>{siteName}</span>
    </a>
  );
};

export default SiteDetail;
