import React, { Component } from 'react';
import PlatformProject from './components/PlatformProject';
import QuickStart from './components/QuickStart';
import MultiAnalysis from './components/MultiAnalysis';
import TeamCard from './components/TeamCard';
import PageWrapper from '@components/PageWrapper';
import { Row, Col } from 'antd';
import './platform.scss';

class Monitor extends Component {
	render() {
		const content = <Col xl={16} lg={16} md={16} sm={24} xs={24}>
			<div className="p-left-part">
				<img
					src={require('@assets/image/userPhoto.jpg')}
					className="user-photo"
				/>
				<div>
					<p>good morning, {name}</p>
					<span>manager | data Department</span>
				</div>
			</div>
		</Col>
		const extraContent = <div className="p-right-part">
			<Row gutter={24}>
				<Col xl={8} lg={8} md={8} sm={4} xs={8}>
					<span>projects</span>
					<p>23</p>
				</Col>
				<Col xl={8} lg={8} md={8} sm={4} xs={8}>
					<span>rank</span>
					<p>1/9</p>
				</Col>
				<Col xl={8} lg={8} md={8} sm={4} xs={8}>
					<span>visitors</span>
					<p>2333</p>
				</Col>
			</Row>
		</div>
		return (
			<PageWrapper content={content} extraContent={extraContent}>
				<div className="platform">
					<Row gutter={24}>
						<Col xl={16} lg={24} md={24} sm={24} xs={24}>
							<QuickStart />
							<Row style={{ margin: '24px 0' }}>
								<PlatformProject />
							</Row>
						</Col>
						<Col xl={8} lg={24} md={24} sm={24} xs={24}>
							<MultiAnalysis />
							<Row style={{ marginTop: '24px' }}>
								<TeamCard />
							</Row>
						</Col>
					</Row>
				</div>
			</PageWrapper>
		);
	}
}

export default Monitor;
