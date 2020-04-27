import React from 'react';
import { copyright } from '@config/setting';
import styles from './footer.module.scss';
import classNames from 'classnames';
import { CopyrightOutlined } from '@ant-design/icons';

const [left, right, href] = copyright;

const Footer: React.FC<{ isInlineLayout: boolean; isHorizontalMenu?: boolean }> = props => (
  <footer
    className={classNames(
      styles.footer,
      props.isInlineLayout && styles.inlineLayout,
      props.isHorizontalMenu && styles.horizontal
    )}
  >
    {left} <CopyrightOutlined /> 2019 Created by{' '}
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
      {right}
    </a>
  </footer>
);

export default Footer;
