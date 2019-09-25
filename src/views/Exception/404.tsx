import React from 'react';
import Exception from '@components/Exception';
import FormatterLocale from '@components/FormatterLocale';

export default () => <Exception errorCode="404" title={<FormatterLocale id="exception.404" />} />;
