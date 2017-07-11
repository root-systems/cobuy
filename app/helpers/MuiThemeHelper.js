import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default function (theme) {
  return getMuiTheme({
    fontFamily: theme.fontFamily,
    palette: {
      primary1Color: theme.colors.teal500,
      primary2Color: theme.colors.teal600,
      primary3Color: theme.colors.teal700,
      accent1Color: theme.colors.deepPurple500,
      accent2Color: theme.colors.deepPurple600,
      accent3Color: theme.colors.deepPurple700,
      textColor: theme.colors.darkBlack,
      alternateTextColor: theme.colors.white,
      canvasColor: theme.colors.white,
      borderColor: theme.colors.grey300,
      shadowColor: theme.colors.fullBlack
    }
  })
}
