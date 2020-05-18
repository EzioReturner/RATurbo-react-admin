import React from 'react';
import { Button, notification } from 'antd';
import { useHistory } from 'react-router-dom';

const ExceptionHome: React.FC = () => {
  const history = useHistory();
  const handleTriggerError = ({ code, description }: { code: number; description: string }) => {
    history.push(`/exception/${code}`);
    notification.error({
      message: `请求错误 ${code}`,
      description
    });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() =>
          handleTriggerError({
            code: 403,
            description: '用户已授权,但是没有访问页面的权限'
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
          handleTriggerError({
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
          handleTriggerError({
            code: 500,
            description: '服务器出错了'
          })
        }
      >
        错误500
      </Button>
    </div>
  );
};

export default ExceptionHome;
