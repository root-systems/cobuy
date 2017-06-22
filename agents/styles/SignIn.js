export default {
  container: () => ({}),
  remotes: () => ({
    display: 'flex',
    flexDirection: 'column'
  }),
  remote: () => ({
    margin: '0.25rem',
    listStyleType: 'none'
  }),
  form: () => ({
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
