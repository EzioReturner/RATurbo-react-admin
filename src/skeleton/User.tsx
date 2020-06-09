import React from 'react';
import { hot } from 'react-hot-loader';
import './user.less';

const UserLayout: React.FC = props => {
  const { children } = props;
  return (
    <div className="RA-UserSkeleton">
      <div>{children}</div>
    </div>
  );
};
const User = process.env.NODE_ENV === 'development' ? hot(module)(UserLayout) : UserLayout;
export default User;
