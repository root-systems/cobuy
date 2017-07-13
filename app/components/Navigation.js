import React from 'react'
import AppBar from 'material-ui/AppBar'

function AppBarWithIcon () {
  return (
    <AppBar
      title="Cobuy"
      iconElementRight={<i className="fa fa-bars" aria-hidden="true"></i>}
    />
  )
}

export default AppBarWithIcon
