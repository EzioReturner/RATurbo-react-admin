import React from 'react';
import styles from './userLayout.module.scss';

const UserLayout = props => {
  const { children } = props;
  return (
    <div className={styles.userLayout}>
      <div className={styles.userContext}>{children}</div>
    </div>
  );
};

export default UserLayout;
