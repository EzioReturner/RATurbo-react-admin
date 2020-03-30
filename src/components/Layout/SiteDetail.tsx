import React from 'react';
import styles from './siderMenu.module.scss';
import { siteName, menuLinkUrl, useSiteIcon, layoutMode } from '@config/setting';
import classNames from 'classnames';

const SiteDetail: React.FC = () => {
  return (
    <a
      className={classNames(
        styles.siteDetail,
        layoutMode === 'inlineLayout' && styles.inlineLayout
      )}
      href={menuLinkUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {useSiteIcon && (
        <img alt="" src={require('@assets/image/logo.png').default} className={styles.logo} />
      )}
      <span className={`ml-2 ${styles.title}`}>{siteName}</span>
    </a>
  );
};

export default SiteDetail;
