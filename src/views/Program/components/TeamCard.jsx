import React, { PureComponent } from 'react';
import { Card } from 'antd';

class TeamCard extends PureComponent {
	render() {
		const data = ['amoy avenger', 'soul tango', 'we are Groot'];
		return (
			<Card title="Team Card" className="fat-card" bordered={false}>
				<div className="team-card">
					{data.map(res => {
						return (
							<div className="team-card-detail">
								<p>{res}</p>
								<span>project:{Math.floor(Math.random() * -9 + 10)}</span>
							</div>
						);
					})}
				</div>
			</Card>
		);
	}
}

export default TeamCard;
