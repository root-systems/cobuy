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
    flex: 1
  }),
  infoContainer: () => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }),
  name: () => ({}),
  labelText: () => ({
    textTransform: 'capitalize'
  })
}
