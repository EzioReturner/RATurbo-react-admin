import React from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import './drawer.less';

interface LKDrawerProps {
  open: boolean;
  openChange: (open: boolean) => void;
  wrapperStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  drawerStyle?: React.CSSProperties;
  wrapperClose?: boolean | Function;
}

const LKDrawer: React.FC<LKDrawerProps> = props => {
  const { open, children, openChange, wrapperStyle, maskStyle, drawerStyle, wrapperClose } = props;

  return ReactDOM.createPortal(
    <div className={classnames('RA-drawer', open && 'RA-drawer-opened')} style={{ ...drawerStyle }}>
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

export default LKDrawer;
