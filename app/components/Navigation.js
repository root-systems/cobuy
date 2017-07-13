import React from 'react'
import { connect as connectFela } from 'react-fela'
import { not } from 'ramda'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { withState, withHandlers, compose } from 'recompose'

import styles from '../styles/Navigation'
import { FormattedMessage } from '../../lib/Intl'

function Navigation (props) {
  const { styles, isDrawerOpen, toggleDrawer } = props

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
        <MenuItem
          leftIcon={
            <i className="fa fa-tachometer" aria-hidden="true" />
          }
        >
          <FormattedMessage
            id='app.dashboard'
            className={styles.labelText}
          />
        </MenuItem>
        <Divider />
        <MenuItem
          leftIcon={
            <i className="fa fa-sign-out" aria-hidden="true" />
          }
        >
          <FormattedMessage
            id='app.logOut'
            className={styles.labelText}
          />
        </MenuItem>
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
