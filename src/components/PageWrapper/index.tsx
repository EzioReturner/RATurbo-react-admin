import React from 'react';
import PageHeader from './PageHeader';
import styles from './pageWrapper.module.less';
import { PageHeaderProps } from '@/models/layout';

interface PageWrapperProps extends PageHeaderProps {
  hideHeader?: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = props => {
  const { hideHeader, children, ...restProps } = props;
  return (
    <div className={styles.pageWrapper}>
      {!hideHeader && <PageHeader {...restProps} />}
      <div className={styles.pageBody}>{children}</div>
    </div>
  );
};

export default PageWrapper;
