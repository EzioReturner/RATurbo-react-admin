import React, { Component } from 'react';
import { Card, Table, Divider, Tag, Progress, Modal } from 'antd';

const confirm = Modal.confirm;

class SaleTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData: [
				{
					key: '1',
					name: 'John Brown',
					amount: '$ 32.77',
					progress: 60,
					tags: ['nice', 'developer']
				},
				{
					key: '2',
					name: 'Jim Green',
					amount: '$ 72.11',
					progress: 82,
					tags: ['loser']
				},
				{
					key: '3',
					name: 'Joe Black',
					amount: '$ 56.21',
					progress: 30,
					tags: ['cool', 'teacher']
				}
			]
		};
	}

	showConfirm([type, record]) {
		const { name } = record;
		const title = `Do you want to ${type} ${name}?`;
		confirm({
			title,
			content: `clicked the OK button, to confirm ${type}d`,
			onOk: () => {
				return new Promise((resolve, reject) => {
					// setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
					setTimeout(() => {
						if (type === 'invite') {
							this.handleInvite(name);
						} else {
							this.handleDelete(record);
						}
						resolve();
					}, 2000);
				}).catch(() => console.log('Oops errors!'));
			},
			onCancel() {}
		});
	}

	handleInvite(name, resolve) {
		console.log(name);
	}

	handleDelete({ key }, e) {
		const { tableData } = this.state;
		tableData.splice(Number(key - 1), 1);
		this.setState({
			tableData: tableData.map((res, index) => {
				return {
					...res,
					key: index + 1
				};
			})
		});
	}

	render() {
		const _renderTags = tags => (
			<span>
				{tags.map(tag => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'loser') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</span>
		);

		const _renderAction = (text, record) => {
			const { name } = record;
			return (
				<span>
					<a
						href="javascript:;"
						onClick={this.showConfirm.bind(this, ['invite', record])}
					>
						Invite {name}
					</a>
					<Divider type="vertical" />
					<a
						href="javascript:;"
						onClick={this.showConfirm.bind(this, ['delete', record])}
					>
						Delete
					</a>
				</span>
			);
		};

		const _renderProgress = progress => {
			let status = progress < 40 ? 'warning' : 'normal';
			if (progress > 70) {
				status = 'success';
			}
			return (
				<span>
					<Progress showInfo={false} percent={progress} className={status} />
				</span>
			);
		};

		const _renderText = text => <a href="javascript:;">{text}</a>;

		const columns = [
			{
				title: '#',
				dataIndex: 'key'
			},
			{
				title: 'Name',
				dataIndex: 'name',
				render: _renderText
			},
			{
				title: 'Amount',
				dataIndex: 'amount'
			},
			{
				title: 'Progress',
				dataIndex: 'progress',
				render: _renderProgress
			},
			{
				title: 'Tags',
				dataIndex: 'tags',
				render: _renderTags
			},
			{
				title: 'Action',
				key: 'action',
				render: _renderAction
			}
		];

		const { tableData } = this.state;

		return (
			<Card bordered={false} className="fat-card" title="Sales" hoverable>
				<Table
					pagination={false}
					className="no-head-border"
					bordered
					columns={columns}
					dataSource={tableData}
				/>
			</Card>
		);
	}
}

export default SaleTable;
