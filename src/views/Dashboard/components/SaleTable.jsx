import React, { Component } from 'react';
import { Card, Table, Divider, Tag, Progress } from 'antd';

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
	render() {
		const columns = [
			{
				title: '#',
				dataIndex: 'key'
			},
			{
				title: 'Name',
				dataIndex: 'name',
				render: text => <a href="javascript:;">{text}</a>
			},
			{
				title: 'Amount',
				dataIndex: 'amount'
			},
			{
				title: 'Progress',
				dataIndex: 'progress',
				render: progress => {
					let status = progress < 40 ? 'warning' : 'normal';
					if (progress > 70) {
						status = 'success';
					}
					return (
						<span>
							<Progress
								showInfo={false}
								percent={progress}
								className={status}
							/>
						</span>
					);
				}
			},
			{
				title: 'Tags',
				dataIndex: 'tags',
				render: tags => (
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
				)
			},
			{
				title: 'Action',
				key: 'action',
				render: (text, record) => (
					<span>
						<a href="javascript:;">Invite {record.name}</a>
						<Divider type="vertical" />
						<a href="javascript:;">Delete</a>
					</span>
				)
			}
		];
		const { tableData } = this.state;
		return (
			<Card bordered={false} className="fat-card" title={<p>Sales</p>}>
				<Table
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
