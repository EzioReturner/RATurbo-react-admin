import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
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

const WrapComponent: React.FC<WrapComponentProps> = props => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

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

export default WrapComponent;
