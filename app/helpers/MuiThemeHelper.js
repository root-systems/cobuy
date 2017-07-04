import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default function (theme) {
  return getMuiTheme({
    fontFamily: theme.fontFamily,
    palette: {
      primary1Color: theme.colorPrimary1,
      primary2Color: theme.colorPrimary2,
      primary3Color: theme.colorPrimary3,
      accent1Color: theme.colorAccent1,
      accent2Color: theme.colorAccent2,
      accent3Color: theme.colorAccent3,
      textColor: theme.colorText,
      alternateTextColor: theme.colorAlternateText,
      canvasColor: theme.colorCanvas,
      borderColor: theme.colorBorder,
      shadowColor: theme.colorShadow
    }
  })
}
