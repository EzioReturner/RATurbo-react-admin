import React from 'react';
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import './result.less';

interface ResultProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  extra?: React.ReactNode;
  actions?: React.ReactNode;
  type: string;
  style?: React.CSSProperties;
}

const Result: React.FC<ResultProps> = props => {
  const { title, subtitle, extra, actions, type, ...restProps } = props;

  const _Icon: any = {
    failed: <CloseCircleFilled className="RA-result-icon RA-result-icon-failed" />,
    successed: <CheckCircleFilled className="RA-result-icon" />
  };

  return (
    <div className="RA-result" {...restProps}>
      {_Icon[type]}
      <p className="RA-result-title">{title}</p>
      <p className="RA-result-subTitle">{subtitle}</p>
      {extra && <div className="RA-result-extra">{extra}</div>}
      {actions && <div className="RA-result-actions">{actions}</div>}
    </div>
  );
};

export default Result;
