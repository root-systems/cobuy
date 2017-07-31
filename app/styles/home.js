export default {
  container: ({ theme }) => {
    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: 'orange',
      alignItems: 'center'
    }
  },
  titleContainer: ({ theme }) => {
    return {
      backgroundColor: 'green'
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
    color: theme.colors.greys[9]
  }),
  bodyContainer: ({ theme }) => {
    return {
      backgroundColor: 'pink'
    }
  },
  bodyText: ({ theme }) => ({
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSizes[2],
    color: theme.colors.greys[7]
  }),
}
