import React from 'react';
import { Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import PlatformProject from './PlatformProject';
import QuickStart from './QuickStart';
import MultiAnalysis from './MultiAnalysis';
import TeamCard from './TeamCard';
import UserStore from '@store/userStore';
import './platform.scss';

interface MonitorInjected {
  userStore: UserStore;
}

const Monitor: React.FC = props => {
  const injected = () => {
    return props as MonitorInjected;
  };

  const {
    userStore: { userInfo }
  } = injected();

  const content = (
    <Col xl={16} lg={16} md={16} sm={24} xs={24}>
      <div className="p-left-part">
        <img alt="" src={require('@assets/image/userPhoto.jpg')} className="user-photo" />
        <div>
          <p>
            <FormatterLocale id="platform.morning" />, {userInfo.name},{' '}
            <FormatterLocale id="platform.greating" />
          </p>
          <span className="subText">
            <FormatterLocale id="platform.job" /> | <FormatterLocale id="platform.department" />
          </span>
        </div>
      </div>
    </Col>
  );
  const extraContent = (
    <div className="p-right-part">
      <Row gutter={24}>
        <Col xl={8} lg={8} md={8} sm={4} xs={8}>
          <FormatterLocale id="platform.projects" className="numTitle" />
          <p>23</p>
        </Col>
        <Col xl={8} lg={8} md={8} sm={4} xs={8}>
          <FormatterLocale id="platform.rank" className="numTitle" />
          <p>1/9</p>
        </Col>
        <Col xl={8} lg={8} md={8} sm={4} xs={8}>
          <FormatterLocale id="platform.visitors" className="numTitle" />
          <p>2333</p>
        </Col>
      </Row>
    </div>
  );
  return (
    <PageWrapper content={content} extraContent={extraContent}>
      <div className="platform">
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <QuickStart />
            <Row style={{ margin: '24px 0' }}>
              <PlatformProject />
            </Row>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <MultiAnalysis />
            <Row style={{ marginTop: '24px' }}>
              <TeamCard />
            </Row>
          </Col>
        </Row>
      </div>
    </PageWrapper>
  );
};

export default inject('userStore')(observer(Monitor));
