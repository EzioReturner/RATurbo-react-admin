import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './result.module.scss';

class Result extends PureComponent {
  render() {
    const { title, subtitle, extra, actions, type, ...restProps } = this.props;

    const _Icon = {
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
  }
}

Result.propTypes = {
  title: PropTypes.node,
  subTitle: PropTypes.node,
  extra: PropTypes.node,
  actions: PropTypes.node,
  type: PropTypes.oneOf(['failed', 'successed'])
};

export default Result;
