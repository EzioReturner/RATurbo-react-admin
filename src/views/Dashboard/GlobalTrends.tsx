import React from 'react';
import { Card } from 'antd';
import EchartsReact from '@components/Echarts';
import { globalTrendsOption } from '@assets/chartOption';
import FormatterLocale from '@components/FormatterLocale';

const GlobalTrends: React.FC = () => {
  return (
    <Card
      hoverable
      bordered={false}
      className="fat-card global-trends"
      bodyStyle={{ overflow: 'hidden' }}
      title={<FormatterLocale id="dashboard.trends" defaultMessage="全球趋势" />}
    >
      <EchartsReact style={{ height: '350px', width: '100%' }} option={globalTrendsOption} />
    </Card>
  );
};

export default GlobalTrends;
