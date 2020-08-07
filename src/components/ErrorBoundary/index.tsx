import React from 'react';
import { BugOutlined } from '@ant-design/icons';
import './index.less';

class ErrorBoundary extends React.Component<
  {
    propStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    info?: any;
  },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 你同样可以将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{ ...this.props.propStyle }}>
          <span className="error-boundary-name">{this.props.info?.name}</span>
          <div className="error-boundary-content" style={{ ...this.props.contentStyle }}>
            <BugOutlined className="error-boundary-icon" />
            <span className="error-boundary-text">出错了...</span>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
