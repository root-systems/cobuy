export default {
  container: () => ({
    width: '50%',
    minWidth: '3rem',
    display: 'flex',
    flexDirection: 'column'
  }),
  innerContainer: () => ({
    display: 'flex',
    flexDirection: 'row'
  }),
  avatarContainer: () => ({
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }),
  infoContainer: () => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }),
  name: () => ({}),
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
