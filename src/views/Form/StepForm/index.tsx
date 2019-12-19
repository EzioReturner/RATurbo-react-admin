import React, { Suspense } from 'react';
import { Card, Steps } from 'antd';
import PageWrapper from '@components/PageWrapper';
import Loading from '@components/Loading';
import FormatterLocale from '@components/FormatterLocale';
import { observer } from 'mobx-react';
import styles from './form.module.scss';
import formStore from './formStore';

const { Step } = Steps;
@observer
class StepForm extends React.Component {
  componentDidMount() {
    formStore.initStep();
  }

  render() {
    const { current, steps, getStepChild } = formStore;
    const Child = getStepChild();
    return (
      <PageWrapper
        title={<FormatterLocale id="form.stepFormTitle" defaultMessage="分步表单" />}
        subTitle={
          <FormatterLocale
            id="form.stepSubtitle"
            defaultMessage="表单页用将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
          />
        }
      >
        <Card bordered={false} className="fat-header">
          <div className={styles.steps}>
            <Steps current={current}>
              {steps.map(item => (
                <Step
                  key={item.id}
                  title={<FormatterLocale id={item.id} defaultMessage={item.title} />}
                />
              ))}
            </Steps>
          </div>
          <Suspense fallback={<Loading spinning />}>
            <Child />
          </Suspense>
        </Card>
      </PageWrapper>
    );
  }
}

export default StepForm;
