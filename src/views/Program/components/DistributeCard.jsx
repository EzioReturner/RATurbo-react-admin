import React, { Component, Fragment } from 'react';
import { Card, Row, Col, Icon } from 'antd';
import EchartsReact from '@components/Echarts';
import { observer, inject } from 'mobx-react';
class ChartCard extends Component {
	render() {
		const style = {
			marginBottom: '24px'
		};
		const { title, option } = this.props;
		const CardTitle = (
			<div className="titleNanme">
				{title}
				<div className="iconBar">
					<Icon type="redo" />
					<Icon
						type="cloud-download"
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
				style={title !== '省份' ? style : null}
				bodyStyle={{ overflow: 'hidden' }}
			>
				<EchartsReact option={option} />
			</Card>
		);
	}
}

@inject('programStore')
@observer
class DistributeCard extends Component {
	render() {
		const {
			showUnDefined,
			getChartOption: {
				circleOption,
				barOption,
				cityOption,
				provinceOption,
				lineOption
			}
		} = this.props.programStore;

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
					<Col>
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
	}
}
export default DistributeCard;
