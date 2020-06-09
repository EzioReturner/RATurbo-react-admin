import React from 'react';
import { Row, Col, Card } from 'antd';
import { BoxSvg, EmpolyeesSvg, OrdersSvg, SalesSvg } from '@components/SvgIcon';
import FormatterLocale from '@components/FormatterLocale';
import Icon, {
  RedoOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  ShakeOutlined
} from '@ant-design/icons';
interface InfoCardProps {
  icon: any;
  tips: string;
  title: string;
  num: string | number;
  tipIcon: React.ReactNode;
  index: string | number;
}

const RowInfoCard: React.FC = () => {
  const details = [
    {
      icon: BoxSvg,
      tips: '65% lower growth',
      title: 'Total Revenue',
      num: '$65,650',
      tipIcon: <ExclamationCircleOutlined className="mr-2" />
    },
    {
      icon: OrdersSvg,
      tips: 'Product-wise sales',
      title: 'Orders',
      num: '3455',
      tipIcon: <ShakeOutlined className="mr-2" />
    },
    {
      icon: SalesSvg,
      tips: 'Weekly Sales',
      title: 'Sales',
      num: '5693',
      tipIcon: <FundOutlined className="mr-2" />
    },
    {
      icon: EmpolyeesSvg,
      tips: 'Product-wise sales',
      title: 'Employees',
      num: '246',
      tipIcon: <RedoOutlined className="mr-2" />
    }
  ];
  const InfoCard = (props: InfoCardProps) => {
    const { icon, tips, title, num, tipIcon, index } = props;
    return (
      <Card className="info-card fat-card" bordered={false} hoverable>
        <div className="top">
          <Icon style={{ marginTop: '12px' }} component={icon as any} />
          <div className="right-part">
            <p className="title">
              {<FormatterLocale id={`dashboard.rowInfo${index}.title`} defaultMessage={title} />}
            </p>
            <h3 className="num">{num}</h3>
          </div>
        </div>
        <p className="tips">
          {tipIcon}
          {
            <FormatterLocale
              propStyle={{ marginLeft: '8px', fontSize: '13px' }}
              id={`dashboard.rowInfo${index}.tips`}
              defaultMessage={tips}
            />
          }
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
