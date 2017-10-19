import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { Route } from 'react-router-dom'
import { pipe, map, values, isNil } from 'ramda'

import ConnectedSwitch from '../../lib/connected-Switch'

import styles from '../styles/Layout'

import Nav from './Navigation'

export default compose(
  connectFela(styles)
)(Layout)

function Layout (props) {
  const { styles, routes, navigationRoutes } = props

  return (
    h('div', {
      className: styles.container
    }, [
      h(Nav, { navigationRoutes }),
      h(ConnectedSwitch, {}, [
        mapRoutePages(routes)
      ])
    ])
  )
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
    h(Route, {
      path,
      key,
      exact,
      component: Component
    })
  )
})
