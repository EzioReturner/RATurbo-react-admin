import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { inject, observer } from 'mobx-react';
import LayoutStore from '@store/layoutStore';
import 'animate.css';
import '@styles/wrapAnimation.less';

/**
 * 动画组件
 * @param {children} ReactNode
 * @param {animate} string 动画名称
 */

interface WrapComponentProps {
  animate: string;
}

interface InjectedProps extends WrapComponentProps {
  layoutStore: LayoutStore;
}

const WrapComponent: React.FC<WrapComponentProps> = props => {
  function injected() {
    return props as InjectedProps;
  }
  const {
    layoutStore: { ctrlProgress, ctrlSpinning }
  } = injected();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
    ctrlSpinning({ spinning: false });
    ctrlProgress(false);
  }, [ctrlProgress, ctrlSpinning]);

  function getAnimateWay(animate: string) {
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

  const { children, animate } = props;
  const className = animate ? getAnimateWay(animate) : 'slide';
  return (
    <CSSTransition in={animateIn} classNames={className} timeout={1000} mountOnEnter unmountOnExit>
      {children}
    </CSSTransition>
  );
};

export default inject('layoutStore')(observer(WrapComponent));
