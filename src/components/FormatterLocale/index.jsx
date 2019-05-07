import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types'

@inject('localeStore')
@observer
class FormatterLocale extends Component {
  render() {
    const { id, defaultMessage, localeStore: { localeObj }, ...rest } = this.props;
    return <span {...rest}>{localeObj[id] || defaultMessage}</span>
  }
}

FormatterLocale.propTypes = {
  id: PropTypes.string,
  defaultMessage: PropTypes.string,
}

export default FormatterLocale;