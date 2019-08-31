import React from 'react';
import { observer, inject } from 'mobx-react';
import LocaleStore from '@store/localeStore';

interface FormatterProps {
  id?: string;
  defaultMessage?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

interface InjectedProps extends FormatterProps {
  localeStore: LocaleStore;
}

const FormatterLocale: React.FC<FormatterProps> = props => {
  const injected = () => {
    return props as InjectedProps;
  };
  const { id, defaultMessage, style, className } = props;
  const {
    localeStore: { localeObj }
  } = injected();

  return (
    <span style={style} className={className}>
      {id ? localeObj[id] : defaultMessage}
    </span>
  );
};

export default inject('localeStore')(observer(FormatterLocale));
