export default {
  container: ({ theme }) => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center',
      height: '100%',
      paddingTop: theme.space[1],
      backgroundColor: theme.colors.canvas,
      [`@media (max-width: ${theme.breakpoints.desktop})`]: {
        backgroundImage: 'url("/images/cobuy-bg-sml-1080.jpg")',
        backgroundSize: 'cover',
        paddingLeft: theme.space[5],
        paddingRight: theme.space[5],
      },
      [`@media (min-width: ${theme.breakpoints.desktop})`]: {
        backgroundImage: 'url("/images/cobuy-bg-lrg-1440.jpg")',
        backgroundSize: 'cover',
        paddingLeft: theme.space[6],
        paddingRight: theme.space[6]
      }
    }
  },
  titleContainer: ({ theme }) => {
    return {
      marginBottom: theme.space[1]
    }
  },
  // Note for SR:
  // Another way of accessing logo and primary1 directly
  // ({ theme: { fonts: { logo }, colors: { primary1 } } })
  // applied e.g.
  // fontFamily: logo
  // color: primary1
  titleText: ({ theme }) => ({
    fontFamily: theme.fonts.logo,
    fontSize: theme.fontSizes[12],
    color: theme.colors.text,
    margin: theme.space[0],
    textAlign: 'center'
  }),
  taglineText: ({ theme }) => ({
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSizes[5],
    color: theme.colors.text,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center'
  }),
  bodyContainer: ({ theme }) => {
    return {
    }
  },
  bodyText: ({ theme }) => ({
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSizes[3],
    color: theme.colors.text
  })
}
