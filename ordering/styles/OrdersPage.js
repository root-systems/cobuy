export default {
  container: ({ theme }) => ({
    width: '50%',
    minWidth: theme.breakpoints.mobileWide,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  labelText: () => ({
    textTransform: 'capitalize'
  }),
  ordersContainer: ({ theme }) => ({
    marginTop: theme.space[2],
    width: '100%'
  }),
  action: ({ theme }) => ({
    margin: '0 auto'
  }),
  button: ({ theme }) => ({
    paddingLeft: theme.space[2],
    paddingRight: theme.space[2],
    paddingTop: theme.space[1],
    paddingBottom: theme.space[1]
  })
}
