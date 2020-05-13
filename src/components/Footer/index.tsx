import React from 'react';
import { copyright } from '@config/setting';
import styles from './footer.module.less';
import classNames from 'classnames';
import { CopyrightOutlined } from '@ant-design/icons';
import './footer.less';

const [left, right, href] = copyright;

const Footer: React.FC<{
  isInlineLayout?: boolean;
  isHorizontalNavigator?: boolean;
  propStyle?: React.CSSProperties;
}> = props => (
  <footer
    className={classNames('RA-footer', props.isHorizontalNavigator && 'RA-footer-horizontal')}
    style={props.propStyle}
  >
    {left} <CopyrightOutlined /> 2020 Created by{' '}
    <a href={href} target="_blank" rel="noopener noreferrer" className="RA-footer-link">
      {right}
    </a>
  </footer>
);

export default Footer;
