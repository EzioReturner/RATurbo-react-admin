import React from 'react';
import Exception from '@components/Exception';

const Test: React.FC<{ data: any }> = props => {
  return (
    <div>
      <Exception errorCode="403" title={props.data.title} />
    </div>
  );
};

export default Test;
