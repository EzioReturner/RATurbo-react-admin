import { observable, configure, action } from 'mobx';
import React from 'react';

configure({ enforceActions: 'always' });

interface StepObj {
  id: string;
  title: string;
  component: any;
}

interface StepData {
  title: string;
  detail: string;
  user: string;
}

class FormStore {
  @observable current: number = 0;
  @observable submitting: boolean = false;
  @observable data: StepData = {
    title: '',
    detail: '',
    user: ''
  };
  steps: Array<StepObj>;

  constructor() {
    this.steps = [
      {
        id: 'form.stepTitle1',
        title: '填写信息',
        component: React.lazy(() => import(/* webpackChunkName: "Step1" */ './Step1'))
      },
      {
        id: 'form.stepTitle2',
        title: '确认报告',
        component: React.lazy(() => import(/* webpackChunkName: "Step2" */ './Step2'))
      },
      {
        id: 'form.stepTitle3',
        title: '完成',
        component: React.lazy(() => import(/* webpackChunkName: "Step3" */ './Step3'))
      }
    ];
  }

  getStepChild = (): any => {
    return this.steps[this.current].component;
  };

  @action initStep = (): void => {
    this.current = 0;
  };

  @action nextStep(): void {
    this.current++;
    this.submitting = false;
  }

  @action setValue(values: StepData): void {
    this.data = values;
  }

  @action onPrev = (): void => {
    this.current--;
  };

  @action onSubmit = (): void => {
    this.submitting = true;
    setTimeout(() => {
      this.nextStep();
    }, 1000);
  };
}

const formStore = new FormStore();

export default formStore;
