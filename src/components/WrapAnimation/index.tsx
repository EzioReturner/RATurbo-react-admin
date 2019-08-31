import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { inject, observer } from 'mobx-react';
import LayoutStore from '@store/layoutStore';
import 'animate.css';
import '@styles/wrapAnimation.scss';

/**
 * 动画组件
 * @param {children} ReactNode
 * @param {animate} string 动画名称
 */

interface WrapComponentProps {
  animate: string;
}

interface WrapComponentState {
  animateIn: boolean;
}

interface InjectedProps extends WrapComponentProps {
  layoutStore: LayoutStore;
}

class WrapComponent extends React.Component<WrapComponentProps, WrapComponentState> {
  get injected() {
    return this.props as InjectedProps;
  }

  state = {
    animateIn: false
  };

  componentDidMount() {
    const {
      layoutStore: { stopSpinning }
    } = this.injected;
    this.setState({
      animateIn: true
    });
    stopSpinning();
  }

  getAnimateWay(animate: string) {
    const [name, useAnimated] = animate.split('-');
    const className = useAnimated
      ? {
          enter: 'animated',
          enterActive: name
        }
      : {
          enter: `${name}-enter`,
          enterActive: `${name}-enter-active`
        };
    return className;
  }

  render() {
    const { children, animate } = this.props;
    const className = animate ? this.getAnimateWay(animate) : 'slide';
    return (
      <CSSTransition
        in={this.state.animateIn}
        classNames={className}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        {children}
      </CSSTransition>
    );
  }
}

export default inject('layoutStore')(observer(WrapComponent));
