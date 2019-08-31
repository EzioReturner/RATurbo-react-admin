import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { inject, observer } from 'mobx-react';
import 'animate.css';
import '@styles/wrapAnimation.scss';

/**
 * 动画组件
 * @param {children} ReactNode
 * @param {animate} string 动画名称
 */
@inject('layoutStore')
@observer
class WrapComponent extends Component {
  state = {
    animateIn: false
  };

  componentDidMount() {
    const { stopSpinning } = this.props.layoutStore;
    this.setState({
      animateIn: true
    });
    stopSpinning();
  }

  getAnimateWay(animate) {
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

export default WrapComponent;
