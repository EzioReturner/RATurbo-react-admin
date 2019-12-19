import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import styles from './loading.module.scss';

/**
 * loading组件
 * @param {spinning} boolean 是否启用
 * @param {fixed} boolean 是否fixed覆盖全局
 */

interface LoadingProps {
  spinning: boolean;
  fixed?: boolean;
  collapsed?: boolean;
  style?: React.CSSProperties;
}

const Loading: React.FC<LoadingProps> = props => {
  const { spinning, fixed, collapsed, style } = props;
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
};

export default observer(Loading);
