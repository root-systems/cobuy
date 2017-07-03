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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { IntlProvider } from 'react-intl'
export default (props) => {
  return (
    <MuiThemeProvider>
      <IntlProvider locale='en'>
        <Layout {...props} />
      </IntlProvider>
    </MuiThemeProvider>
  )
}
