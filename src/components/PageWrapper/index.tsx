import React from 'react';
import PageHeader from './PageHeader';
import './pageWrapper.less';

const PageWrapper: React.FC<PageWrapperProps> = props => {
  const { hideHeader, children, style, ...restProps } = props;
  return (
    <div className="RA-pageWrapper" style={style}>
      {!hideHeader && <PageHeader {...restProps} />}
      <div className="RA-pageWrapper-body">{children}</div>
    </div>
  );
};

export default PageWrapper;
