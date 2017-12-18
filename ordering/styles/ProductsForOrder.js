export default {
  container: () => ({
    display: 'flex',
    flexDirection: 'column'
  }),
  buttonsContainer: () => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }),
  gridContainer: () => ({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap'
  })
}
