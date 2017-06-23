/* global document */
import React from 'react'
import { IntlProvider } from 'react-intl'

export default () =>
  story => {
    return (
      <IntlProvider locale='en'>
        {story()}
      </IntlProvider>
    );
  }
