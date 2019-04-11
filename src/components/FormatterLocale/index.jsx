import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('localeStore')
@observer
class FormatterLocale extends Component {
  render() {
    const { id, defaultMessage, localeStore: { localeObj }, ...rest } = this.props;
    return <span {...rest}>{localeObj[id] || defaultMessage}</span>
  }
}

export default FormatterLocale;