import React, { Fragment } from 'react';
import Exception from '@components/Exception';
import FormatterLocale from '@components/FormatterLocale';

export default () => (
  <Fragment>
    <Exception errorCode="403" title={<FormatterLocale id="exception.403" />} />
  </Fragment>
);
