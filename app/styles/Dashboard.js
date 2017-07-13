export default {
  container: () => ({
    width: '50%',
    minWidth: '3rem',
    display: 'flex',
    flexDirection: 'column'
  }),
  labelText: () => ({
    textTransform: 'capitalize'
  }),
  intro: () => ({
    textAlign: 'center',
    fontSize: '2rem'
  }),
  buttonContainer: () => ({
    paddingTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  button: () => ({
    width: '50%'
  })
}