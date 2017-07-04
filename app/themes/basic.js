import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
  teal500,
  teal600,
  teal700,
  white,
  darkBlack,
  deepPurple500,
  deepPurple600,
  deepPurple700,
  grey300,
  fullBlack
} from 'material-ui/styles/colors'

export default getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: teal500,
    primary2Color: teal600,
    primary3Color: teal700,
    accent1Color: deepPurple500,
    accent2Color: deepPurple600,
    accent3Color: deepPurple700,
    textColor: white,
    alternateTextColor: darkBlack,
    canvasColor: white,
    borderColor: grey300,
    shadowColor: fullBlack
  }
})
