import { observable, configure, action } from 'mobx';
import React, { Component } from 'react';

configure({ enforceActions: 'always' });

interface StepObj {
  title: string;
  component: any;
}
class FormStore {
  @observable current: number = 0;
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
}

const formStore = new FormStore;

export default formStore;