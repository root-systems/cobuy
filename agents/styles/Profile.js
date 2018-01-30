export default {
  container: () => ({
    // width: '50%',
    // minWidth: '3rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
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
  buttonText: ({ theme }) => ({
    textTransform: 'capitalize',
    color: theme.colors.alternateText
  }),
  intro: () => ({
    textAlign: 'center',
    fontSize: '2rem'
  }),
  buttonContainer: () => ({
    paddingTop: '20px',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }),
  button: () => ({
    width: '50%'
  }),
  myGroupsContainer: () => ({
    paddingTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  })
}
