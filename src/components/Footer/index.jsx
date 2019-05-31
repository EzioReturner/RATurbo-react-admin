import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { copyright } from 'config/setting';
import styles from './footer.module.scss';

const [left, right, href] = copyright;
class Footer extends PureComponent {
  render() {
    return (
      <footer className={styles.footer}>
        {left} <Icon type="copyright" /> 2019 Created by <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>{right}</a>
      </footer>
    )
  }
}

export default Footer;