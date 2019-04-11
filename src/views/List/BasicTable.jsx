import React, { Component } from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';

class BasicTable extends Component {
  render() {
    return (
      <PageWrapper title={<FormatterLocale id="basicTable.title" />}>
        123
      </PageWrapper>
    )
  }
}

export default BasicTable;