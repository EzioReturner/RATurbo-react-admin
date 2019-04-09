import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import styles from './footer.module.scss';

class Footer extends PureComponent {
  render() {
    return <footer className={styles.footer}>
      RA-Turbo admin <Icon type="copyright" /> 2019 Created by <a href="https://github.com/EzioReturner" target="_blank" className={styles.link}>ezioreturner@gmail.com</a>
    </footer>
  }
}

export default Footer;