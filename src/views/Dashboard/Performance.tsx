import React from 'react';
import { Card, Progress } from 'antd';
import FormatterLocale from '@components/FormatterLocale';

const Performance = () => {
  return (
    <Card
      bordered={false}
      hoverable
      className="performance-card fat-card"
      title={
        <p className="headerTitle">
          {' '}
          <FormatterLocale id="dashboard.perTitle" defaultMessage="历史表现" />
        </p>
      }
    >
      <div className="jus-b warp-flex">
        <div>
          <p className="text-1 mb-2">
            <FormatterLocale id="dashboard.bestPerformance" defaultMessage="最优表现" />
          </p>
          <p className="text-3 mb-4">+45.2%</p>
        </div>
        <div>2018</div>
      </div>
      <div className="jus-b warp-flex">
        <div>
          <p className="text-1 mb-2">
            <FormatterLocale id="dashboard.worstPerformance" defaultMessage="最劣表现" />
          </p>
          <p className="text-3 mb-4">-35%</p>
        </div>
        <div>2017</div>
      </div>
      <div
        style={{
          marginBottom: '-4px'
        }}
      >
        <div className="jus-b warp-flex">
          <p className="mb-0">
            <FormatterLocale id="dashboard.sales" defaultMessage="销售量" />
          </p>
          <p
            className="mb-0"
            style={{
              color: '#308ee0'
            }}
          >
            88%
          </p>
        </div>
        <div>
          <Progress percent={88} showInfo={false} status="active" />
        </div>
      </div>
      <div className="mt-4">
        <div className="jus-b warp-flex">
          <p className="mb-0">
            <FormatterLocale id="dashboard.visits" defaultMessage="访问量" />
          </p>
          <p
            className="mb-0"
            style={{
              color: '#00ce68'
            }}
          >
            56%
          </p>
        </div>
        <div>
          <Progress showInfo={false} percent={56} status="active" className="success" />
        </div>
      </div>
    </Card>
  );
};

export default Performance;
