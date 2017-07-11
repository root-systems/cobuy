export default {
  container: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
