import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('userStore')
@observer
class PlatformHead extends Component {
	render() {
		const { name } = this.props.userStore.userInfo;
		return (
			<Card className="fat-card platform-head" bordered={false}>
				<div>
					<div className="head-info">
						<div className="left-part">
							<img
								src={require('@assets/image/userPhoto.jpg')}
								className="user-photo"
							/>
							<div>
								<p>good morning, {name}</p>
								<span>manager | data Department</span>
							</div>
						</div>
						<div className="right-part">
							<Row gutter={24}>
								<Col span={8}>
									<span>projects</span>
									<p>23</p>
								</Col>
								<Col span={8}>
									<span>rank</span>
									<p>1/9</p>
								</Col>
								<Col span={8}>
									<span>visitors</span>
									<p>2333</p>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</Card>
		);
	}
}

export default PlatformHead;
