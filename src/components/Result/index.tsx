import React from 'react';
import styles from './result.module.less';
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
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
    failed: <CloseCircleFilled className={`${styles.icon} ${styles.failed}`} />,
    successed: <CheckCircleFilled className={styles.icon} />
  };

  return (
    <div className={styles.result} {...restProps}>
      {_Icon[type]}
      <p className={styles.title}>{title}</p>
      <p className={styles.subTitle}>{subtitle}</p>
      {extra && <div className={styles.extra}>{extra}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};

export default Result;
