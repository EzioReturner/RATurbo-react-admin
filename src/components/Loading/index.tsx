import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import './loading.less';

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
        'RA-loading',
        !spinning && 'RA-loading-hide',
        fixed && 'RA-loading-fixed',
        collapsed && 'RA-loading-collapsed'
      )}
      style={style}
    >
      <div className="RA-loading-content">
        <div className="RA-loading-content-circle" />
        <span>{text || 'LOADING'}</span>
      </div>
    </div>
  );
};

export default observer(Loading);
