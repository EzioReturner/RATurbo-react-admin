import React from 'react';
import { Card } from 'antd';
import EchartsReact from '@components/Echarts';
import { gaugeOption } from '@assets/chartOption';
import FormatterLocale from '@components/FormatterLocale';

const Efficiency: React.FC = () => {
  return (
    <Card
      hoverable
      bordered={false}
      className="fat-card"
      title={<FormatterLocale id="monitor.gauge" defaultMessage="仪表盘" />}
      style={{ marginBottom: '24px' }}
    >
      <EchartsReact option={gaugeOption} style={{ height: '200px' }} />
    </Card>
  );
};

export default Efficiency;
