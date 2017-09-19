import React from 'react'
import { connect as connectFela } from 'react-fela'
import { not, pipe, map, values, isNil } from 'ramda'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { withState, withHandlers, compose } from 'recompose'
import { NavLink } from 'react-router-dom'
import { LogOut } from 'dogstack-agents/components'

import styles from '../styles/Navigation'
import { FormattedMessage } from '../../lib/Intl'

function Navigation (props) {
  const { styles, isDrawerOpen, toggleDrawer, navigationRoutes } = props

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
          <Component
            key={name}
            as={MenuItem}
            leftIcon={
              <i className={icon} aria-hidden="true" />
            }
          />
        )
      }

      return (
        <NavLink to={path} key={name}>
          <MenuItem
            leftIcon={
              <i className={icon} aria-hidden="true" />
            }
          >
            <FormattedMessage
              id={title}
              className={styles.labelText}
            />
          </MenuItem>
        </NavLink>
      )
    }),
    values
  )

  return (
    <div>
      <AppBar
        title={
          <FormattedMessage
            id='app.name'
            className={styles.labelText}
          />
        }
        onLeftIconButtonTouchTap={toggleDrawer}
      />
      <Drawer open={isDrawerOpen}>
        <MenuItem
          leftIcon={
            <i className="fa fa-bars" aria-hidden="true"/>
          }
          onTouchTap={toggleDrawer}
        >
          <FormattedMessage
            id='app.closeMenu'
            className={styles.labelText}
          />
        </MenuItem>
        <Divider />
        {mapRouteItems(navigationRoutes)}
        <Divider />
      </Drawer>
    </div>
  )
}

export default compose(
  connectFela(styles),
  withState('isDrawerOpen', 'setDrawerOpen', false),
  withHandlers({
    toggleDrawer: ({ setDrawerOpen }) => () => setDrawerOpen(not)
  })
)(Navigation)
