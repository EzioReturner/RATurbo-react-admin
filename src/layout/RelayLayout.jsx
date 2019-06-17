import React from 'react';
import styles from './relayLayout.module.scss';

const RelayLayout = (props) => {
  const { children } = props;
  return (
    <div className={styles.relayLayout}>
      {children}
    </div>
  )
}

export default RelayLayout;