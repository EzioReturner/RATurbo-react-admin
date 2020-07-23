import React from 'react';
import { BugOutlined } from '@ant-design/icons';
import './index.less';

class ErrorBoundary extends React.Component<
  { propStyle?: React.CSSProperties },
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
      // 你可以自定义降级后的 UI 并渲染
      return (
        <div className="error-boundary" style={{ ...this.props.propStyle }}>
          <BugOutlined className="error-boundary-icon" />
          <span className="error-boundary-text">出错了...</span>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
