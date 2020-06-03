import React from 'react';
import Breadcrumb from '@components/Breadcrumb';
import classnames from 'classnames';

const PageHeader: React.FC<PageHeaderProps> = props => {
  const { hideBreadcrumb, title, subTitle, content, extraContent, logo, withoutHeaderBody } = props;
  return (
    <div
      className={classnames(
        'RA-pageWrapper-header',
        withoutHeaderBody && 'RA-pageWrapper-header-withoutBody'
      )}
    >
      {!hideBreadcrumb && <Breadcrumb />}
      {!withoutHeaderBody && (
        <>
          {logo && <div>{logo}</div>}
          <div className="RA-pageWrapper-header-main">
            <div className="RA-pageWrapper-header-row">
              {title && <h1 className="RA-pageWrapper-header-title">{title}</h1>}
              {subTitle && <div className="RA-pageWrapper-header-subTitle">{subTitle}</div>}
            </div>
            <div className="RA-pageWrapper-header-row">
              {content && <div className="RA-pageWrapper-header-content">{content}</div>}
              {extraContent && (
                <div className="RA-pageWrapper-header-extraContent">{extraContent}</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PageHeader;
