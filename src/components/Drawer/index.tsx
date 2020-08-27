import React from 'react';
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
  wrapperClose?: boolean | Function;
}

const RADrawer: React.FC<RADrawerProps> = props => {
  const {
    open,
    children,
    openChange,
    wrapperStyle,
    maskStyle,
    drawerStyle,
    wrapperClose,
    direction
  } = props;

  let _direction = direction || 'up';

  return ReactDOM.createPortal(
    <div
      className={classnames(
        'RA-drawer',
        open && 'RA-drawer-opened',
        `RA-drawer-direction-${_direction}`
      )}
      style={{ ...drawerStyle }}
    >
      <div
        className="RA-drawer-mask"
        style={{ ...maskStyle }}
        onClick={() => {
          openChange(false);
        }}
      ></div>
      <div
        className="RA-drawer-wrapper"
        style={{ ...wrapperStyle }}
        onClick={e => {
          if (wrapperClose && e.target === e.currentTarget) {
            openChange(false);
            typeof wrapperClose === 'function' && wrapperClose();
          }
        }}
      >
        {children}
      </div>
    </div>,
    document.getElementsByTagName('body')[0]
  );
};

export default RADrawer;
