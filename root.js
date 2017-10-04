import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'

addLocaleData([...en])

const messagesByLocale = {
  'en': require('./app/locales/en'),
  'en-US': require('./app/locales/en-us')
}

export default {
  appNode: '#app',
  messagesByLocale
}
