import React from 'react';
import { Card } from 'antd';
import { monitorListOption } from '@assets/chartOption';
import EchartsReact from '@components/Echarts';
import FormatterLocale from '@components/FormatterLocale';

const MonitorList: React.FC = () => {
  return (
    <Card
      title={<FormatterLocale id="monitor.rank" defaultMessage="销售排行" />}
      className="fat-card monitor-list-card"
      bordered={false}
      hoverable
    >
      <EchartsReact style={{ height: '490px' }} option={monitorListOption} />
    </Card>
  );
};

export default MonitorList;
