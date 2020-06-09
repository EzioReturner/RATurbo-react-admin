import React from 'react';
import Loading from '@components/Loading';
import { observer, inject } from 'mobx-react';
import LayoutStore from '@store/layoutStore';
import classNames from 'classnames';
import { Header } from './Component';
import Footer from '@components/Footer';
import { copyright } from '@config/setting';
import { LayoutProps } from './types';

// 顶部导航栏模式
const HorizontalMode: React.FC<LayoutProps> = props => {
  const {
    layoutStore: {
      layoutStatus: { showHeader, fixHeader },
      loadingOptions,
      isContentFlowMode
    }
  } = props as { layoutStore: LayoutStore };

  const { header: _headr, ...rest } = props;

  return (
    <div
      id="mainContainer"
      className={classNames(
        'RA-basicLayout-horizontal',
        !showHeader && 'RA-basicLayout-horizontal-hideHeader',
        isContentFlowMode && 'RA-basicLayout-horizontal-contentFlow',
        fixHeader && 'RA-basicLayout-horizontal-fixHeader'
      )}
    >
      {showHeader && (_headr || <Header {...rest} />)}
      <div className="RA-basicLayout-horizontal-wrapper">
        {props.children}
        {copyright && <Footer propStyle={{ marginTop: '16px' }} />}
      </div>
      <Loading {...loadingOptions} />
    </div>
  );
};

export default inject('layoutStore')(observer(HorizontalMode));
