import React from 'react';
import { Row, Col, Card, Icon } from 'antd';
import { CustomIconComponentProps } from 'antd/lib/icon';
import { BoxSvg, EmpolyeesSvg, OrdersSvg, SalesSvg } from '@components/SvgIcon';
import FormatterLocale from '@components/FormatterLocale';

interface InfoCardProps {
  icon: React.ComponentType<CustomIconComponentProps>;
  tips: string;
  title: string;
  num: string | number;
  tipIcon: string;
  index: string | number;
}

const RowInfoCard: React.FC = () => {
  const details = [
    {
      icon: BoxSvg,
      tips: '65% lower growth',
      title: 'Total Revenue',
      num: '$65,650',
      tipIcon: 'exclamation-circle'
    },
    {
      icon: OrdersSvg,
      tips: 'Product-wise sales',
      title: 'Orders',
      num: '3455',
      tipIcon: 'shake'
    },
    {
      icon: SalesSvg,
      tips: 'Weekly Sales',
      title: 'Sales',
      num: '5693',
      tipIcon: 'fund'
    },
    {
      icon: EmpolyeesSvg,
      tips: 'Product-wise sales',
      title: 'Employees',
      num: '246',
      tipIcon: 'redo'
    }
  ];
  const InfoCard = (props: InfoCardProps) => {
    const { icon, tips, title, num, tipIcon, index } = props;
    return (
      <Card className="info-card fat-card" bordered={false} hoverable>
        <div className="top">
          <Icon component={icon} />
          <div className="right-part">
            <p className="title">
              {<FormatterLocale id={`dashboard.rowInfo${index}.title`} defaultMessage={title} />}
            </p>
            <h3 className="num">{num}</h3>
          </div>
        </div>
        <p className="mb-0 mt-3 text-muted">
          <Icon type={tipIcon} className="mr-2" />
          {<FormatterLocale id={`dashboard.rowInfo${index}.tips`} defaultMessage={tips} />}
        </p>
      </Card>
    );
  };
  return (
    <Row gutter={24} className="rowInfo-card">
      {details.map((dl, index) => (
        <Col xl={6} lg={12} md={12} sm={24} xs={24} key={index} style={{ marginBottom: '24px' }}>
          <InfoCard {...dl} index={index} />
        </Col>
      ))}
    </Row>
  );
};

export default RowInfoCard;
