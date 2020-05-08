import React from 'react';
import ControllerCard from './ControllerCard';
import DistributeCard from './DistributeCard';
import './analysis.less';

const Analysis: React.FC = () => {
  return (
    <div className="analysis">
      <ControllerCard />
      <DistributeCard />
    </div>
  );
};

export default Analysis;
