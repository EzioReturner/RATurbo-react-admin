import React, { Component } from 'react';
import { Card, Select, Button, DatePicker, Icon, Switch } from 'antd';
import { observer, inject } from 'mobx-react';

const { Option } = Select;
@inject('programStore')
@observer
class Controller extends Component {
	getOptions() {
		return Array(5)
			.fill(1)
			.map((res, index) => {
				return (
					<Option key={index}>
						{Math.random()
							.toString(36)
							.substr(2)}
					</Option>
				);
			});
	}

	handleSwitch = checked => {
		this.props.programStore.changeShowUnDefined(checked);
	};

	render() {
		const marginRight = {
			sx: {
				marginRight: '16px'
			},
			et: {
				marginRight: '8px'
			}
		};

		const ControlHead = (
			<div className="headerContent">
				<Icon type="filter" />
				<span className="headerTextSpan">筛选条件</span>
				<Select placeholder="全部APP" size="small">
					{this.getOptions()}
				</Select>
				<Select placeholder="双平台" size="small">
					{this.getOptions()}
				</Select>
				<DatePicker size="small" style={marginRight.sx} />
				<Button type="primary" size="small">
					查询
				</Button>
			</div>
		);
		const { showUnDefined } = this.props.programStore;
		return (
			<Card
				size="small"
				title={ControlHead}
				bordered={false}
				hoverable
				className="controlHead"
				bodyStyle={{
					display: 'flex',
					alignItems: 'center',
					minWidth: '580px',
					justifyContent: 'space-between'
				}}
			>
				<div style={{ flex: 1, marginLeft: '16px' }}>
					<Switch
						defaultChecked={showUnDefined}
						style={marginRight.et}
						onChange={this.handleSwitch}
					/>
					<span className="headerTextSpan">未识别</span>
				</div>
				<span className="headerTextSpan rightSpace">
					符合当前筛选条件的总用户数为：21,312,393
					<Icon type="question-circle" />
				</span>
			</Card>
		);
	}
}

export default Controller;
