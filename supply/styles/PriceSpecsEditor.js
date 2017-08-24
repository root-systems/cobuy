export default {
  container: () => ({
  }),
  intro: ({ theme }) => ({
    textTransform: 'capitalize',
    fontWeight: theme.fontWeights.bold
  }),
  labelText: () => ({
    textTransform: 'capitalize'
  }),
  priceSpecs: () => ({
    display: 'flex',
    flexDirection: 'column'
  }),
  priceSpecContainer: () => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }),
  addPriceSpecButton: () => ({
  }),
  removePriceSpecButton: () => ({
  }),
  buttonText: () => ({
    textTransform: 'capitalize'
  })
}
