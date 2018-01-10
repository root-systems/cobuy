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
  groupNameContainer: () => ({
    display: 'flex',
    paddingBottom: '2rem'
  }),
  labelText: () => ({
    textTransform: 'capitalize'
  }),
  fieldsContainer: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  rowContainer: () => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  }),
  addButtonContainer: () => ({
    paddingTop: '2rem'
  }),
  removeButtonContainer: () => ({
    paddingBottom: '1rem',
    paddingLeft: '2rem'
  }),
  button: () => ({
    width: '10rem'
  }),
  buttonText: ({ theme }) => ({
    textTransform: 'capitalize',
    color: theme.colors.alternateText
  })
}
