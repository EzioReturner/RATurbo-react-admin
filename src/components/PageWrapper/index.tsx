import React from 'react';
import PageHeader from './PageHeader';
import { PageHeaderProps } from '@/models/layout';
import './pageWrapper.less';

interface PageWrapperProps extends PageHeaderProps {
  hideHeader?: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = props => {
  const { hideHeader, children, ...restProps } = props;
  return (
    <div className="RA-pageWrapper">
      {!hideHeader && <PageHeader {...restProps} />}
      <div className="RA-pageWrapper-body">{children}</div>
    </div>
  );
};

export default PageWrapper;
