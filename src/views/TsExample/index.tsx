import React, { Component } from 'react';
import PageWrapper from 'components/PageWrapper';
import FormatterLocale from 'components/FormatterLocale';
const style = require('./index.module.scss');

interface TitleProps {
  title: string;
}

const Title = (props: TitleProps): any => {
  const { title } = props;
  return (
    <h1 className={style.title}>
      {title}
    </h1>
  )
}

class TsExample extends Component {
  render() {
    return (
      <PageWrapper title={<FormatterLocale id="typescript" defaultMessage="TypeScript样例" />}>
        <Title title="ts-Example is at work!" />
      </PageWrapper>
    );
  }
}

export default TsExample;