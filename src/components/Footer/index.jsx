import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import styles from './footer.module.scss';
import { copyright } from '@src/config/setting'

const [left, right, href] = copyright;
class Footer extends PureComponent {
  render() {
    return <footer className={styles.footer}>
      {left} <Icon type="copyright" /> 2019 Created by <a href={href} target="_blank" className={styles.link}>{right}</a>
    </footer>
  }
}

export default Footer;