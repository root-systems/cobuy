import { isNil, reverse, mergeAll, any, map } from 'ramda'

export default getLocaleMessages

function getLocaleMessages (messagesByLocale, locale) {
  const subLocales = getSubLocales(locale)
  if (!any(nextLocale => !isNil(messagesByLocale[nextLocale]))(subLocales)) {
    throw new Error(`patch-intl: ${locale} locale not found in locales`)
  }
  const messagesBySubLocale = map(subLocale => messagesByLocale[subLocale])(subLocales)
  return mergeAll(reverse(messagesBySubLocale))
}

// iterate through locale and parent locales
// for example: en-US -> [en-US, en]
function getSubLocales (locale) {
  var subLocales = [locale]
  while (locale.indexOf('-') !== -1) {
    const localeTags = locale.split('-')
    const parentLocaleTags = localeTags.slice(0, localeTags.length - 1)
    const parentLocale = parentLocaleTags.join('-')
    subLocales.push(parentLocale)
    locale = parentLocale
  }
  return subLocales
}
