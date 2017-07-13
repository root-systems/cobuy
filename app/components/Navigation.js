import React from 'react'
import AppBar from 'material-ui/AppBar'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    }
  }

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  render () {
    return (
      <div>
        <AppBar
          title="Cobuy"
          onLeftIconButtonTouchTap={this.handleDrawerToggle}
        />
        <Drawer open={this.state.drawerOpen}>
          <MenuItem
            leftIcon={
              <i className="fa fa-bars" aria-hidden="true"/>
            }
            onTouchTap={this.handleDrawerToggle}
          />
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    )
  }
}

// export default Navigation
