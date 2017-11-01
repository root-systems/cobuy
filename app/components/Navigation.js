import h from 'react-hyperscript'
import { connect as connectFela } from 'react-fela'
import { not, pipe, map, values } from 'ramda'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { withState, withHandlers, compose } from 'recompose'
import { NavLink } from 'react-router-dom'
import { LogOut } from 'dogstack-agents/components'

import styles from '../styles/Navigation'
import { FormattedMessage } from 'dogstack/intl'

function Navigation (props) {
  const {
    styles,
    config,
    isDrawerOpen,
    toggleDrawer,
    navigationRoutes
  } = props

  const { app: { name: appName } } = config

  const mapRouteItems = pipe(
    map(route => {
      const {
        path,
        name = path,
        navigation
      } = route

      const {
        Component,
        title = name,
        icon
      } = navigation

      if (Component) {
        return (
          h(Component, {
            onClick: toggleDrawer,
            key: name,
            as: MenuItem,
            leftIcon: (
              h('i', {
                className: icon,
                'aria-hidden': true
              })
            )
          })
        )
      }

      return (
        h(NavLink, {
          to: path,
          key: name
        }, [
          h(MenuItem, {
            onClick: toggleDrawer,
            leftIcon: (
              h('i', {
                className: icon,
                'aria-hidden': true
              })
            )
          }, [
            h(FormattedMessage, {
              id: title,
              className: styles.labelText
            })
          ])
        ])
      )
    }),
    values
  )

  return (
    h('div', [
      h(AppBar, {
        title: (
          h(FormattedMessage, {
            id: 'app.name',
            className: styles.labelText,
            values: {
              appName
            }
          })
        ),
        onLeftIconButtonTouchTap: toggleDrawer
      }),
      h(Drawer, {
        open: isDrawerOpen
      }, [
        h(MenuItem, {
          leftIcon: (
            h('i', {
              className: 'fa fa-bars',
              'aria-hidden': true
            })
          ),
          onClick: toggleDrawer
        }, [
          h(FormattedMessage, {
            id: 'app.closeMenu',
            className: styles.labelText
          })
        ]),
        h(Divider),
        mapRouteItems(navigationRoutes),
        h(Divider)
      ])
    ])
  )
}

export default compose(
  connectFela(styles),
  withState('isDrawerOpen', 'setDrawerOpen', false),
  withHandlers({
    toggleDrawer: ({ setDrawerOpen }) => () => setDrawerOpen(not)
  })
)(Navigation)
