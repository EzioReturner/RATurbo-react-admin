import React from 'react';
import WrapAnimation from '@components/WrapAnimation';
import { inject } from 'mobx-react';
import LayoutStore from '@store/layoutStore';

interface AsyncProps {
  componentInfo: any;
  route: any;
}

interface AsyncState {
  component: any;
  animate: string;
}

interface InjectProps extends AsyncProps {
  layoutStore: LayoutStore;
}

/**
 * 懒加载模块
 * @param {componentInfo} object 懒加载模块信息
 * componentInfo 内部参数
 * {asyncComponent} 动态import的方法
 * {animate} 动画名称
 * {path} 校验路径
 */

@inject('layoutStore')
class AsyncComponent extends React.PureComponent<AsyncProps, AsyncState> {
  get injected() {
    return this.props as InjectProps;
  }

  state = {
    component: '',
    animate: ''
  };

  async componentDidMount() {
    const {
      componentInfo: [componentOrPath, animate],
      route
    } = this.props;
    const { layoutStore } = this.injected;
    // 检查路径是否已加载 判断是否显示loading
    layoutStore.checkIsInitial(route);
    let C: any;
    if (typeof componentOrPath === 'string') {
      const { default: component } = await import(
        /* webpackChunkName: "[request]" */ `../../../src${componentOrPath}`
      );
      C = component;
    } else {
      C = componentOrPath;
    }

    this.setState({
      component: C,
      animate: animate
    });

    setTimeout(
      () => {
        layoutStore.ctrlProgress(false);
        layoutStore.ctrlSpinning({ spinning: false });
      },
      animate ? 500 : 0
    );
  }

  render() {
    const { component, animate } = this.state;

    const C: any = component;

    if (animate === 'notAnimate') {
      return <C {...this.props} />;
    }

    return C ? (
      <WrapAnimation animate={animate}>
        <C {...this.props} />
      </WrapAnimation>
    ) : null;
  }
}
export default AsyncComponent;
