import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import styles from './result.module.scss';

class Result extends PureComponent {
  render() {
    const { title, subtitle, extra, actions, type, ...restProps } = this.props;
    return <div className={styles.result} {...restProps}>
      {type === 'failed'
        ? <Icon className={`${styles.icon} ${styles.failed}`} type="close-circle" theme="filled" />
        : <Icon className={styles.icon} type="check-circle" theme="filled" />}
      <p className={styles.title}>{title}</p>
      <p className={styles.subTitle}>{subtitle}</p>
      {extra && <div className={styles.extra}>{extra}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  }
}

export default Result;