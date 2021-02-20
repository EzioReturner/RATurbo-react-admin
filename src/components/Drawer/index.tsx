import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import './drawer.less';

interface RADrawerProps {
  open: boolean;
  openChange: (open: boolean) => void;
  direction?: 'up' | 'left' | 'down' | 'right';
  wrapperStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  drawerStyle?: React.CSSProperties;
  targetContainer?: any;
}

const RADrawer: React.FC<RADrawerProps> = props => {
  const {
    open,
    children,
    openChange,
    wrapperStyle,
    maskStyle,
    drawerStyle,
    direction,
    targetContainer
  } = props;

  const drawerRef = useRef<HTMLDivElement>(null);

  let _direction = direction || 'up';

  useEffect(() => {
    setTimeout(() => {
      if (drawerRef.current) {
        if (open) {
          drawerRef.current.className = drawerRef.current.className + ' RA-drawer-opened';
        } else {
          drawerRef.current.className = drawerRef.current.className
            .replace('RA-drawer-opened', '')
            .trim();
        }
      }
    }, 10);
  }, [open]);

  let portal = null;

  const DrawerDom = (
    <div
      className={classnames(
        'RA-drawer',
        // open && 'RA-drawer-opened',
        `RA-drawer-direction-${_direction}`,
        targetContainer === false && 'RA-drawer-in-parent'
      )}
      style={{ ...drawerStyle }}
      ref={drawerRef}
    >
      <div
        className="RA-drawer-mask"
        style={{ ...maskStyle }}
        onClick={() => {
          openChange(false);
        }}
      ></div>
      <div className="RA-drawer-wrapper" style={{ ...wrapperStyle }}>
        {children}
      </div>
    </div>
  );

  if (drawerRef.current || open) {
    portal =
      targetContainer === false
        ? DrawerDom
        : ReactDOM.createPortal(
            DrawerDom,
            targetContainer || document.getElementsByTagName('body')[0]
          );
  }

  return portal;
};

export default RADrawer;
