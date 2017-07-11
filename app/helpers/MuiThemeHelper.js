import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default function (theme) {
  return getMuiTheme({
    fontFamily: theme.fontFamily,
    palette: {
      primary1Color: theme.colors.primary1,
      primary2Color: theme.colors.primary2,
      primary3Color: theme.colors.primary3,
      accent1Color: theme.colors.accent1,
      accent2Color: theme.colors.accent2,
      accent3Color: theme.colors.accent3,
      textColor: theme.colors.text,
      alternateTextColor: theme.colors.alternateText,
      canvasColor: theme.colors.canvas,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow
    }
  })
}
