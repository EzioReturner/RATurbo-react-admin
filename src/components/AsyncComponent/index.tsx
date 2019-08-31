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
      componentInfo: [componentPath, animate],
      route
    } = this.props;
    const { layoutStore } = this.injected;
    // 检查路径是否已加载 判断是否显示loading
    layoutStore.checkIsInitial(route);
    const { default: component } = await import('../../../src' + componentPath);
    this.setState({
      component: component,
      animate: animate
    });
  }

  render() {
    const { component, animate } = this.state;
    const {
      layoutStore: { stopSpinning }
    } = this.injected;
    const C: any = component;

    if (animate === 'notAnimate') {
      stopSpinning();
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
