export default {
  container: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  labelText: () => ({
    textTransform: 'capitalize'
  }),
  intro: ({ theme }) => ({
    textAlign: 'center',
    fontSize: theme.fontSizes[2]
  }),
  taskNameText: () => ({
    textTransform: 'capitalize'
  })
}
