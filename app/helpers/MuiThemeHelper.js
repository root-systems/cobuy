import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default function (theme) {
  return getMuiTheme({
    fontFamily: theme.fontFamily,
    palette: {
      primary1Color: theme.primary1Color,
      primary2Color: theme.primary2Color,
      primary3Color: theme.primary3Color,
      accent1Color: theme.accent1Color,
      accent2Color: theme.accent2Color,
      accent3Color: theme.accent3Color,
      textColor: theme.textColor,
      alternateTextColor: theme.alternateTextColor,
      canvasColor: theme.canvasColor,
      borderColor: theme.borderColor,
      shadowColor: theme.shadowColor
    }
  })
}
