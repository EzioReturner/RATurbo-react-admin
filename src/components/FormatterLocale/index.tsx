import React from 'react';
import { observer, inject } from 'mobx-react';
import LocaleStore from '@store/localeStore';

interface FormatterProps {
  id: string;
  defaultMessage?: React.ReactNode;
  propStyle?: React.CSSProperties;
  className?: string;
}

interface InjectedProps extends FormatterProps {
  localeStore: LocaleStore;
}

const FormatterLocale: React.FC<FormatterProps> = props => {
  const {
    id,
    defaultMessage,
    propStyle,
    className,
    localeStore: { localeObj }
  } = props as InjectedProps;

  return (
    <span style={propStyle} className={className}>
      {localeObj[id] || defaultMessage}
    </span>
  );
};

export default inject('localeStore')(observer(FormatterLocale));
