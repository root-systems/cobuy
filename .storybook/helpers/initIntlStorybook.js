/* global document */
import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import getLocaleMessages from '../../app/helpers/getLocaleMessages'

const locale = navigator.language
addLocaleData([...en])
const messagesByLocale = {
  'en': require('../../app/locales/en'),
  'en-US': require('../../app/locales/en-us')
}

const messages = getLocaleMessages(messagesByLocale, locale)

export default () =>
  story => {
    return (
      <IntlProvider
        locale={locale}
        messages={messages}
      >
        {story()}
      </IntlProvider>
    )
  }
