export default {
  container: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  intro: () => ({
    textAlign: 'center',
    fontSize: '2rem'
  }),
  remotes: () => ({
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  remote: () => ({
    margin: '0.25rem',
    padding: 0,
    width: '50%',
    minWidth: '12rem',
    listStyleType: 'none'
  }),
  form: () => ({
    width: '50%',
    minWidth: '3rem',
    display: 'flex',
    flexDirection: 'column'
  }),
  actions: () => ({
    display: 'flex',
    justifyContent: 'center'
  }),
  signInAction: () => ({}),
  registerAction: () => ({}),
}
