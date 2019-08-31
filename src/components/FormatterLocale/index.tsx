import React from 'react';
import { observer, inject } from 'mobx-react';
import LocaleStore from '@store/localeStore';

interface FormatterProps {
  id: string;
  defaultMessage?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

interface InjectedProps extends FormatterProps {
  localeStore: LocaleStore;
}

@inject('localeStore')
@observer
class FormatterLocale extends React.Component<FormatterProps> {
  get injected() {
    return this.props as InjectedProps;
  }

  render() {
    const { id, defaultMessage, style, className } = this.props;
    const {
      localeStore: { localeObj }
    } = this.injected;

    return (
      <span style={style} className={className}>
        {localeObj[id] || defaultMessage}
      </span>
    );
  }
}

export default FormatterLocale;
