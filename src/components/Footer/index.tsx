import React from 'react';
import { Icon } from 'antd';
import { copyright, inlineHeader } from '@config/setting';
import styles from './footer.module.scss';
import classNames from 'classnames';

const [left, right, href] = copyright;

const Footer: React.FC = () => (
  <footer className={classNames(styles.footer, inlineHeader && styles.inlineHeader)}>
    {left} <Icon type="copyright" /> 2019 Created by{' '}
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
      {right}
    </a>
  </footer>
);

export default Footer;
