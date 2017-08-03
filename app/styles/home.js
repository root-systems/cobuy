export default {
  container: ({ theme }) => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.space[2]
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
    color: theme.colors.greys[9],
    margin: theme.space[0]
  }),
  bodyContainer: ({ theme }) => {
    return {
    }
  },
  bodyText: ({ theme }) => ({
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSizes[2],
    color: theme.colors.greys[7]
  }),
}
