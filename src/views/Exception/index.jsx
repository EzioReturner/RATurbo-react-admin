import React, { Component } from 'react';
import { Button, notification } from 'antd';
import { withRouter } from 'react-router-dom';

@withRouter
class ExceptionHome extends Component {
  handleTriggerError({ code, description }) {
    this.props.history.push(`/exception/${code}`);
    notification.error({
      message: `请求错误 ${code}`,
      description
    });
  }

  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={() =>
            this.handleTriggerError({
              code: 403,
              description: '用户已授权,但是没有访问页面的权限哦~'
            })
          }
        >
          错误403
        </Button>
        <Button
          style={{
            margin: '0 16px'
          }}
          type="primary"
          onClick={() =>
            this.handleTriggerError({
              code: 404,
              description: '抱歉~服务器上没有相应的资源'
            })
          }
        >
          错误404
        </Button>
        <Button
          type="primary"
          onClick={() =>
            this.handleTriggerError({
              code: 500,
              description: '服务器出错了哦'
            })
          }
        >
          错误500
        </Button>
      </div>
    );
  }
}

export default ExceptionHome;
