import React, { Component } from 'react';
import { Card } from 'antd';
import { popularOption } from '@assets/chartOption';
import FormatterLocale from '@components/FormatterLocale';
import { mapData, topData } from '@assets/popular';
import EchartsReact from '@components/Echarts';

class PopularMap extends Component {
  render() {
    const option = popularOption(mapData, topData);
    return (
      <Card
        hoverable
        bordered={false}
        className="fat-card poplar-map-card"
        title={<FormatterLocale id="monitor.realTime" defaultMessage="实时热点分布" />}
      >
        <EchartsReact option={option} style={{ height: '490px' }} />
      </Card>
    );
  }
}

export default PopularMap;
