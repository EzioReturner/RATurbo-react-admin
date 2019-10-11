import React from 'react';
import { Card, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';
import UserStore from '@store/userStore';
const imgUrl = require('@assets/image/userPhoto.jpg');

interface PlatformHeadInjected {
  userStore: UserStore;
}

const PlatformHead: React.FC = props => {
  const injected = () => {
    return props as PlatformHeadInjected;
  };
  const {
    userStore: {
      userInfo: { name }
    }
  } = injected();
  return (
    <Card className="fat-card platform-head" bordered={false}>
      <div>
        <div className="head-info">
          <Row>
            <Col xl={16} lg={16} md={16} sm={24} xs={24}>
              <div className="left-part">
                <img alt="" src={imgUrl} className="user-photo" />
                <div>
                  <p>good morning, {name}</p>
                  <span>manager | data Department</span>
                </div>
              </div>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24}>
              <div className="right-part">
                <Row gutter={24}>
                  <Col xl={8} lg={8} md={8} sm={4} xs={8}>
                    <span>projects</span>
                    <p>23</p>
                  </Col>
                  <Col xl={8} lg={8} md={8} sm={4} xs={8}>
                    <span>rank</span>
                    <p>1/9</p>
                  </Col>
                  <Col xl={8} lg={8} md={8} sm={4} xs={8}>
                    <span>visitors</span>
                    <p>2333</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default inject('userStore')(observer(PlatformHead));
