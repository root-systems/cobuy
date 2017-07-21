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
  buttonContainer: () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  button: () => ({
    width: '100%'
  })
}
