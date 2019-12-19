import React from 'react';
import { Icon } from 'antd';
import styles from './result.module.scss';

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
    failed: (
      <Icon className={`${styles.icon} ${styles.failed}`} type="close-circle" theme="filled" />
    ),
    successed: <Icon className={styles.icon} type="check-circle" theme="filled" />
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
