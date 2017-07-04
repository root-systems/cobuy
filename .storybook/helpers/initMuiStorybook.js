/* global document */
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import basicTheme from '../../app/themes/basic'

export default () =>
  story => {
    return (
      <MuiThemeProvider muiTheme={basicTheme}>
        {story()}
      </MuiThemeProvider>
    )
  }
