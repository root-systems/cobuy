export default {
  container: ({ theme }) => ({
    width: '50%',
    minWidth: theme.space[4],
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  labelText: () => ({
    textTransform: 'capitalize'
  }),
  ordersContainer: ({ theme }) => ({
    maginTop: theme.space[2],
    width: '100%'
  }),
  action: ({ theme }) => ({
    margin: '0 auto'
  })
}
