import { observable, configure, action } from 'mobx';
import React, { Component } from 'react';

configure({ enforceActions: 'always' });

interface StepObj {
  title: string;
  component: any;
}

interface StepData {
  title: string;
  detail: string;
  user: string;
}

class FormStore {
  @observable current: number = 2;
  @observable submitting: boolean = false;
  @observable data: StepData = {
    title: '',
    detail: '',
    user: ''
  };
  steps: Array<StepObj>;

  constructor() {
    this.steps = [{
      title: '填写信息',
      component: React.lazy(() =>
        import(/* webpackChunkName: "403" */ './Step1')
      ),
    }, {
      title: '确认报告',
      component: React.lazy(() =>
        import(/* webpackChunkName: "403" */ './Step2')
      ),
    }, {
      title: '完成',
      component: React.lazy(() =>
        import(/* webpackChunkName: "403" */ './Step3')
      ),
    }];
  }

  getStepChild = (): any => {
    return this.steps[this.current].component;
  }

  @action initStep = (): void => {
    this.current = 0;
  }

  @action nextStep(): void {
    this.current++;
    this.submitting = false;
  }

  @action setValue(values: StepData): void {
    this.data = values
  }

  @action onPrev(): void {
    this.current--;
  }

  @action onSubmit = (): void => {
    this.submitting = true;
    setTimeout(() => {
      this.nextStep();
    }, 1000);
  }
}

const formStore = new FormStore;

export default formStore;