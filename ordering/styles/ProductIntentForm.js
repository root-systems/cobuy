export default {
  container: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.space[3]
  }),
  labelText: () => ({
    textTransform: 'capitalize'
  }),
  priceSpecContainer: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.space[3]
  }),
  priceSpecText: () => ({
  }),
  quantityContainer: () => ({
    display: 'flex',
    width: '100px'
  }),
  quantityTextField: () => ({
  })
}
