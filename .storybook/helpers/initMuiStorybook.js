/* global document */
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default () =>
  story => {
    return (
      <MuiThemeProvider>
        {story()}
      </MuiThemeProvider>
    );
  }
