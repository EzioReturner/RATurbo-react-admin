import React from 'react';
import Loading from '@components/Loading';
import { observer, inject } from 'mobx-react';
import LayoutStore from '@store/layoutStore';
import classNames from 'classnames';
import { Header } from '@components/Layout';
import Footer from '@components/Footer';
import ViewContent from './ViewContent';
import { copyright } from '@config/setting';

// 顶部导航栏模式
const HorizontalMode: React.FC<{ route: RouteRoot }> = props => {
  const {
    layoutStore: {
      layoutStatus: { showHeader, fixHeader },
      loadingOptions,
      isContentFlowMode
    }
  } = props as { layoutStore: LayoutStore; route: RouteRoot };

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
      {showHeader && <Header />}
      <div className="RA-basicLayout-horizontal-wrapper">
        <ViewContent {...props} />
        {copyright.length > 0 && <Footer propStyle={{ marginTop: '16px' }} />}
      </div>
      <Loading {...loadingOptions} />
    </div>
  );
};

export default inject('layoutStore')(observer(HorizontalMode));
