import React, { Component, Suspense } from 'react';
import { Card, Steps } from 'antd';
import PageWrapper from '@components/PageWrapper';
import Loading from '@components/Loading';
import { observer } from 'mobx-react';
import styles from './form.module.scss';
import formStore from './components/formStore';

const Step = Steps.Step;

@observer
class StepForm extends Component {
	componentDidMount() {
		formStore.initStep();
	}

	render() {
		const { current, steps, getStepChild } = formStore;
		const Child = getStepChild();
		return (
			<PageWrapper title="分步表单" subTitle="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
				<Card bordered={false} className="fat-header">
					<div className={styles.steps}>
						<Steps current={current}>
							{steps.map(item => <Step key={item.title} title={item.title} />)}
						</Steps>
					</div>
					<Suspense fallback={<Loading fixed />}>
						<Child />
					</Suspense>
				</Card>
			</PageWrapper>
		);
	}
}

export default StepForm;
