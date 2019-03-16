import React, { Component } from 'react';
import { Card } from 'antd';
import PageWrapper from '@components/PageWrapper/Index';

class BasicForm extends Component {
	render() {
		return (
			<PageWrapper>
				<Card bordered={false} className="fat-header">
					BasicForm
				</Card>
			</PageWrapper>
		);
	}
}

export default BasicForm;
