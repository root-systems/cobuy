import React from 'react'
import { createComponent } from '@ahdinosaur/react-fela'
import { Route, Switch } from 'react-router-dom'
import { pipe, map, values, isNil } from 'ramda'

import styles from '../styles/layout'

import Nav from './nav'

const Container = createComponent(styles.container, 'div')

function Layout (props) {
  const { routes, navigationRoutes } = props
  const pages = mapRoutePages(routes)

  return <Container>
    <Nav navigationRoutes={navigationRoutes} />
    <Switch>
      {pages}
    </Switch>
  </Container>
}

const mapRoutePages = map(route => {
  const {
    path,
    exact,
    Component
  } = route

  if (isNil(Component)) return null

  const key = path || '404'

  return (
    <Route path={path} key={key} exact={exact} component={Component} />
  )
})

// TODO move this to some config for dogstack
import PropTypes from 'prop-types'
import { Provider as FelaProvider, ThemeProvider as FelaThemeProvider } from 'react-fela'
import { StyleProvider as VeelProvider } from 'veel'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import getLocaleMessages from '../helpers/getLocaleMessages'
import MuiThemeHelper from '../helpers/MuiThemeHelper'
import baseTheme from '../themes/base'

const locale = navigator.language
addLocaleData([...en])
const messagesByLocale = {
  'en': require('../locales/en'),
  'en-US': require('../locales/en-us')
}
const messages = getLocaleMessages(messagesByLocale, locale)

const Root = (props, context) => {
  return (
    <FelaThemeProvider theme={baseTheme}>
      <VeelProvider renderer={context.renderer} config={baseTheme}>
        <MuiThemeProvider muiTheme={MuiThemeHelper(baseTheme)}>
          <IntlProvider
            locale={locale}
            messages={messages}
          >
            <Layout {...props} />
          </IntlProvider>
        </MuiThemeProvider>
      </VeelProvider>
    </FelaThemeProvider>
  )
}

Root.contextTypes = { renderer: PropTypes.object }

export default Root
