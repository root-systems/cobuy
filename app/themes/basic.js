import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
  teal500,
  teal600,
  teal700,
  white,
  darkblack,
  deeppurple500,
  deeppurple600,
  deeppurple700,
  grey300,
  fullBlack
} from 'material-ui/styles/colors'

export default getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: teal500,
    primary2Color: teal600,
    primary3Color: teal700,
    accent1Color: deeppurple500,
    accent2Color: deeppurple600,
    accent3Color: deeppurple700,
    textColor: white,
    alternateTextColor: darkblack,
    canvasColor: white,
    borderColor: grey300,
    shadowColor: fullBlack
  }
})
