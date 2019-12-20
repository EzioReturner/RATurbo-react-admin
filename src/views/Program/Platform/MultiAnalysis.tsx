import React from 'react';
import { Card } from 'antd';
import { multiAnalysisOption } from '@assets/chartOption';
import EchartsReact from '@components/Echarts';
import FormatterLocale from '@components/FormatterLocale';

const MultiAnalysis = () => {
  return (
    <Card
      className="fat-card"
      hoverable
      bordered={false}
      title={<FormatterLocale id="platform.MutliAnalysis" />}
    >
      <EchartsReact option={multiAnalysisOption} />
    </Card>
  );
};

export default MultiAnalysis;
