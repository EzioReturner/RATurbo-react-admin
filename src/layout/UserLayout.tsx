import React from 'react';
import styles from './userLayout.module.less';
import { hot } from 'react-hot-loader';

const UserLayout: React.FC = props => {
  const { children } = props;
  return (
    <div className={styles.userLayout}>
      <div className={styles.userContext}>{children}</div>
    </div>
  );
};
const User = process.env.NODE_ENV === 'development' ? hot(module)(UserLayout) : UserLayout;
export default User;
