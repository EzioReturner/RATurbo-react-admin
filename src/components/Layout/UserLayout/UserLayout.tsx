import React from 'react';
import { hot } from 'react-hot-loader';
import './userLayout.less';

const UserLayout: React.FC = props => {
  const { children } = props;
  return (
    <div className="RA-userLayout">
      <div>{children}</div>
    </div>
  );
};
const User = process.env.NODE_ENV === 'development' ? hot(module)(UserLayout) : UserLayout;
export default User;
