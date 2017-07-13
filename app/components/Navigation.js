import React from 'react'
import AppBar from 'material-ui/AppBar'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleToggle = () => this.setState({ open: !this.state.open })

//   render() {
//     return (
//       <div>
//         <RaisedButton
//           label="Toggle Drawer"
//           onTouchTap={this.handleToggle}
//         />
//         <Drawer open={this.state.open}>
//           <MenuItem>Menu Item</MenuItem>
//           <MenuItem>Menu Item 2</MenuItem>
//         </Drawer>
//       </div>
//     );
//   }
// }

render () {
  return (
    <div>
      <AppBar
        title="Cobuy"
        iconElementRight={<i className="fa fa-bars" aria-hidden="true" onClick={this.handleToggle}></i>}
      />
      <Drawer open={this.state.open}>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    </div>
  )
}

// export default Navigation
