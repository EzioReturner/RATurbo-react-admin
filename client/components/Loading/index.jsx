import React, { Component } from 'react';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './loading.module.scss';

/**
 * loading组件
 * @param {spinning} boolean 是否启用
 * @param {fixed} boolean 是否fixed覆盖全局
 */
@inject('layoutStore')
@observer
class Loading extends Component {
  render() {
    const { spinning, fixed, collapsed, style } = this.props;
    return (
      <div
        className={classNames(
          styles.loading,
          !spinning ? styles.hide : '',
          fixed ? styles.fixed : '',
          collapsed ? styles.collapsed : ''
        )}
        style={style}
      >
        <div className={styles.content}>
          <div className={styles.circle} />
          <span>LOADING</span>
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  spinning: PropTypes.bool,
  fixed: PropTypes.bool
};

export default Loading;
