import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Grid, Button } from 'antd';
import PlatformHead from './components/PlatformHead';
import PlatformProject from './components/PlatformProject';
import QuickStart from './components/QuickStart';
import MultiAnalysis from './components/MultiAnalysis';
import TeamCard from './components/TeamCard';
import { Row, Col } from 'antd';
import './platform.scss';

class Monitor extends Component {
	render() {
		return (
			<div className="platform">
				<PlatformHead />
				<div className="platformContainer">
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
			</div>
		);
	}
}

export default Monitor;
