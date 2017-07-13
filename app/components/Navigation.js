import React from 'react'
import { connect as connectFela } from 'react-fela'
import { pipe } from 'ramda'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

import styles from '../styles/Navigation'
import { FormattedMessage } from '../../lib/Intl'

class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      drawerOpen: false
    }
  }

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  render () {
    const { styles } = this.props
    return (
      <div>
        <AppBar
          title={
            <FormattedMessage
              id='app.name'
              className={styles.labelText}
            />
          }
          onLeftIconButtonTouchTap={this.handleDrawerToggle}
        />
        <Drawer open={this.state.drawerOpen}>
          <MenuItem
            leftIcon={
              <i className="fa fa-bars" aria-hidden="true"/>
            }
            onTouchTap={this.handleDrawerToggle}
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
}

export default pipe(
  connectFela(styles)
)(Navigation)
