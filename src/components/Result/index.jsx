import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import styles from './result.module.scss';

class Result extends PureComponent {
  render() {
    const { title, subTitle } = this.props;
    return <div className={styles.result}>
      <Icon className={styles.icon} type="check-circle" theme="filled" />
      <p className={styles.title}>{title}</p>
      <p className={styles.subTitle}>{subTitle}</p>
    </div>
  }
}

export default Result;