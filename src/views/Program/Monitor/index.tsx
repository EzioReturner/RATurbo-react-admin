import React from 'react';
import { Row, Col } from 'antd';
import PopularMap from './PopularMap';
import MonitorList from './MonitorList';
import Proportion from './Proportion';
import Efficiency from './Efficiency';
import Surplus from './Surplus';
import './monitor.scss';

const Monitor: React.FC = () => (
  <div className="monitor">
    <Row gutter={24}>
      <Col xl={16} lg={24} md={24} sm={24} xs={24}>
        <PopularMap />
      </Col>
      <Col xl={8} lg={24} md={24} sm={24} xs={24}>
        <MonitorList />
      </Col>
    </Row>
    <Row gutter={24}>
      <Col xl={12} lg={8} md={24} sm={24} xs={24}>
        <Proportion />
      </Col>
      <Col xl={6} lg={8} md={24} sm={24} xs={24}>
        <Efficiency />
      </Col>
      <Col xl={6} lg={8} md={24} sm={24} xs={24}>
        <Surplus />
      </Col>
    </Row>
  </div>
);

export default Monitor;
