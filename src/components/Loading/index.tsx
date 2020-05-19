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

  const CycleLoading = <div id="RA-loading-content-circle" />;

  const AngleLoading = (
    <div id="RA-loading-content-angle">
      <span className="angle-border border-1"></span>
      <span className="angle-border border-2"></span>
      <span className="angle-border border-3"></span>
      <div className="angle-content">
        <div className="angle-content-bg"></div>
      </div>
    </div>
  );

  const BarLoading = (
    <div id="RA-loading-content-bar">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );

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
        {BarLoading}
        <p className="RA-loading-content-text">{text || 'LOADING...'}</p>
      </div>
    </div>
  );
};

export default observer(Loading);
