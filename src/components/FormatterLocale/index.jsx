import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('localeStore')
@observer
class FormatterLocale extends Component {
  render() {
    const { id, defaultMessage, localeStore: { localeObj } } = this.props;
    return <div>{localeObj[id] || defaultMessage}</div>
  }
}

export default FormatterLocale;