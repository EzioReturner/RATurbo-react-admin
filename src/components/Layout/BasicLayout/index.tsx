import React from 'react';
import './basicLayout.less';
import HorizontalMode from './HorizontalMode';
import VerticalMode from './VerticalMode';
import { SkeletonProps } from './types';

const BasicLayout: React.FC<SkeletonProps> = props => {
  const { isHorizontalNavigator, ...rest } = props;
  return <>{isHorizontalNavigator ? <HorizontalMode {...rest} /> : <VerticalMode {...rest} />}</>;
};

export default BasicLayout;
