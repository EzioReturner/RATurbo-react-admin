import React from 'react';
import { copyright } from '@config/setting';
import styles from './footer.module.less';
import classNames from 'classnames';
import { CopyrightOutlined } from '@ant-design/icons';

const [left, right, href] = copyright;

const Footer: React.FC<{
  isInlineLayout?: boolean;
  isHorizontalNavigator?: boolean;
  propStyle?: React.CSSProperties;
}> = props => (
  <footer
    className={classNames(
      styles.footer,
      props.isInlineLayout && styles.inlineLayout,
      props.isHorizontalNavigator && styles.horizontal
    )}
    style={props.propStyle}
  >
    {left} <CopyrightOutlined /> 2019 Created by{' '}
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
      {right}
    </a>
  </footer>
);

export default Footer;
