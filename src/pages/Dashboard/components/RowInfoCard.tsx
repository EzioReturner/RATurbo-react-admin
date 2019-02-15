import React, { PureComponent } from 'react';
import { Row, Col, Card, Icon } from 'antd';
import { boxSvg, empolyeesSvg, ordersSvg, salesSvg } from './SvgIcon';

export interface Props {
  icon: any;
  tips: string;
  title: string;
  num: any;
  tipIcon: string;
}

class InfoCard extends PureComponent<Props> {
  render() {
    const { icon, tips, title, num, tipIcon } = this.props;
    return (
      <Card className="infoCard" bordered={false}>
        <div className="top">
          <Icon component={icon} />
          <div className="rightPart">
            <p className="title"> {title} </p>
            <h3 className="num"> {num} </h3>
          </div>
        </div>
        <p className="tips">
          <Icon type={tipIcon} />
          {tips}
        </p>
      </Card>
    );
  }
}

class RowInfoCard extends PureComponent {
  render() {
    const details = [
      {
        icon: boxSvg,
        tips: '65% lower growth',
        title: 'Total Revenue',
        num: '$65,650',
        tipIcon: 'exclamation-circle'
      },
      {
        icon: ordersSvg,
        tips: 'Product-wise sales',
        title: 'Orders',
        num: '3455',
        tipIcon: 'shake'
      },
      {
        icon: salesSvg,
        tips: 'Weekly Sales',
        title: 'Sales',
        num: '5693',
        tipIcon: 'fund'
      },
      {
        icon: empolyeesSvg,
        tips: 'Product-wise sales',
        title: 'Employees',
        num: '246',
        tipIcon: 'redo'
      }
    ];
    return (
      <Row gutter={24} className="rowInfoCard">
        {details.map((dl, index) => (
          <Col span={6} key={index}>
            <InfoCard {...dl} />
          </Col>
        ))}
      </Row>
    );
  }
}

export default RowInfoCard;
