import React, { PureComponent } from 'react';
import { Card, Button, Avatar } from 'antd';
import { getContact } from '@api/platform';

class QuickStart extends PureComponent {
	state = {
		contact: []
	};

	componentDidMount() {
		getContact().then(res => {
			console.log(res);
			this.setState({
				contact: res.data.results
			});
		});
	}

	render() {
		const { contact } = this.state;
		return (
			<Card title="Quick Contact" className="fat-card" bordered={false}>
				<div className="quick-start">
					{contact.map((res, index) => {
						return (
							<div className="ac" key={index}>
								<Avatar src={res.picture.thumbnail} />
								<p>{res.name.first}</p>
							</div>
						);
					})}
					<div className="ac">
						<Button type="primary" size="small" icon="plus">
							add
						</Button>
					</div>
				</div>
			</Card>
		);
	}
}

export default QuickStart;
