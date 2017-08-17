export default {
  container: () => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    width: '100%'
  }),
  switchContainer: () => ({
    width: '12rem',
    paddingBottom: '0.5rem'
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
    alignItems: 'flex-end'
  }),
  addItemButtonContainer: () => ({
    paddingTop: '2rem'
  }),
  removeItemButtonContainer: () => ({
    paddingTop: '2rem'
  }),
  button: () => ({
    width: '12rem'
  }),
  buttonText: () => ({
    textTransform: 'capitalize'
  })
}
