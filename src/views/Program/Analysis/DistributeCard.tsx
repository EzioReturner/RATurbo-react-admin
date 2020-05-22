import React, { Fragment } from 'react';
import { Card, Row, Col } from 'antd';
import EchartsReact from '@components/Echarts';
import { observer } from 'mobx-react';
import { RedoOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { programStore } from './programStore';

const ChartCard = (props: any) => {
  const style: React.CSSProperties = {
    marginBottom: '24px'
  };
  const { title, option } = props;
  const CardTitle = (
    <div className="titleNanme">
      {title}
      <div className="iconBar">
        <RedoOutlined />
        <CloudDownloadOutlined
          style={{
            marginLeft: '10px'
          }}
        />
      </div>
    </div>
  );
  return (
    <Card
      hoverable
      title={CardTitle}
      className="thin-card"
      bordered={false}
      style={title !== '省份' ? style : undefined}
      bodyStyle={{ overflow: 'hidden' }}
    >
      <EchartsReact option={option} />
    </Card>
  );
};

const DistributeCard: React.FC = () => {
  const {
    getChartOption: { circleOption, barOption, cityOption, provinceOption, lineOption }
  } = programStore;

  return (
    <Fragment>
      <Row gutter={24}>
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
          <ChartCard title="性别" option={circleOption} />
        </Col>
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
          <ChartCard title="年龄" option={barOption} />
        </Col>
      </Row>
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <ChartCard title="渠道" option={lineOption} />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
          <ChartCard title="城市" option={[barOption, cityOption]} />
        </Col>
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
          <ChartCard title="省份" option={[barOption, provinceOption]} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(DistributeCard);
