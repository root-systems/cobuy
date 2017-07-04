/* global document */
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import baseTheme from '../../app/themes/base'
import MuiThemeHelper from '../../app/helpers/MuiThemeHelper'

export default () =>
  story => {
    return (
      <MuiThemeProvider muiTheme={MuiThemeHelper(baseTheme)}>
        {story()}
      </MuiThemeProvider>
    )
  }
