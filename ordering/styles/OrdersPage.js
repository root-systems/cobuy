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
    width: '20%'
  }),
  buttonText: ({ theme }) => ({
    textTransform: 'capitalize',
    color: theme.colors.alternateText
  })
}
