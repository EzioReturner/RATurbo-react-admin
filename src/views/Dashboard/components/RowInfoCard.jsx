import React, { PureComponent } from 'react';
import { Row, Col, Card, Icon } from 'antd';
import { BoxSvg, EmpolyeesSvg, OrdersSvg, SalesSvg } from '@components/SvgIcon';

class InfoCard extends PureComponent {
	render() {
		const { icon, tips, title, num, tipIcon } = this.props;
		return (
			<Card className="infoCard fat-card" bordered={false}>
				<div className="top">
					<Icon component={icon} />
					<div className="rightPart">
						<p className="title">{title}</p>
						<h3 className="num">{num}</h3>
					</div>
				</div>
				<p className="mb-0 mt-3 text-muted">
					<Icon type={tipIcon} className="mr-2" />
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
