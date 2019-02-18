import React, { Component } from 'react';
import { Card, Progress } from 'antd';

class Performance extends Component {
	render() {
		return (
			<Card
				bordered={false}
				className="performanceCard fat-card"
				title={<p className="headerTitle">Performance History</p>}
			>
				<div className="justify-between warp-flex">
					<div>
						<p className="text-1 mb-2">The best performance</p>
						<p className="text-3 mb-4">+45.2%</p>
					</div>
					<div>2018</div>
				</div>
				<div className="justify-between warp-flex">
					<div>
						<p className="text-1 mb-2">The worst performance</p>
						<p className="text-3 mb-4">-35%</p>
					</div>
					<div>2017</div>
				</div>
				<div
					style={{
						marginBottom: '-4px'
					}}
				>
					<div className="justify-between warp-flex">
						<p className="mb-0">Sales</p>
						<p
							className="mb-0"
							style={{
								color: '#308ee0'
							}}
						>
							88%
						</p>
					</div>
					<div>
						<Progress percent={88} showInfo={false} status="active" />
					</div>
				</div>
				<div className="mt-4">
					<div className="justify-between warp-flex">
						<p className="mb-0">Sales</p>
						<p
							className="mb-0"
							style={{
								color: '#00ce68'
							}}
						>
							56%
						</p>
					</div>
					<div>
						<Progress
							showInfo={false}
							percent={56}
							status="active"
							className="success"
						/>
					</div>
				</div>
			</Card>
		);
	}
}

export default Performance;
