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
    width: '20%',
    margin: '10px'
  }),
  removePriceSpecButton: () => ({
    width: '20%',
    margin: '10px'
  }),
  buttonText: ({ theme }) => ({
    textTransform: 'capitalize',
    color: theme.colors.alternateText
  })
}
