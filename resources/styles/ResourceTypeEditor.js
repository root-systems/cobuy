export default {
  container: () => ({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '2rem'
  }),
  resourceHeader: () => ({
    display: 'flex',
    fontSize: '2rem'
  }),
  field: ({ empty }) => ({
    margin: '10px'
  }),
  submitButton: () => ({
  }),
  contains: () => ({
  }),
  switchContainer: () => ({
    display: 'flex',
    flexDirection: 'column'
  }),
  paragraphText: ({ theme }) => ({
    textTransform: 'capitalize',
    fontWeight: theme.fontWeights.bold
  }),
  labelText: () => ({
    textTransform: 'capitalize'
  }),
  itemListContainer: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  itemContainer: () => ({
    display: 'flex',
    alignItems: 'center'
  }),
  addItemButtonContainer: () => ({
  }),
  removeItemButtonContainer: () => ({
  }),
  button: () => ({
  }),
  buttonText: () => ({
    textTransform: 'capitalize'
  })
}
