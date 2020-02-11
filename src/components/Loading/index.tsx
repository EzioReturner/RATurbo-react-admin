import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import styles from './loading.module.scss';

/**
 * loading组件
 * @param {spinning} 是否启用
 * @param {fixed} 是否fixed覆盖全局
 * @param {text} 自定义文本
 * @param {style} 自定义样式
 * @param {Collapsed} 是否应用框架折叠样式
 */

interface LoadingProps {
  spinning: boolean;
  fixed?: boolean;
  collapsed?: boolean;
  style?: React.CSSProperties;
  text?: string | number | React.ReactNode;
}

const Loading: React.FC<LoadingProps> = props => {
  const { spinning, fixed, collapsed, style, text } = props;
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
        <span>{text || 'LOADING'}</span>
      </div>
    </div>
  );
};

export default observer(Loading);
