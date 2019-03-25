import React, { Component } from 'react';
import { Card } from 'antd';
import PageWrapper from '@components/PageWrapper/Index';

class StepForm extends Component {
	render() {
		return (
			<PageWrapper>
				<Card bordered={false} className="fat-header">
					StepForm
				</Card>
			</PageWrapper>
		);
	}
}

export default StepForm;
