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
  labelText: () => ({
    textTransform: 'capitalize'
  }),
  fieldsContainer: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  fieldContainer: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  offeringContainer: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  rowContainer: () => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%'
  }),
  switchContainer: () => ({
    width: '12rem',
    paddingBottom: '0.5rem'
  }),
  addOfferingButtonContainer: () => ({
    paddingTop: '2rem'
  }),
  removeOfferingButtonContainer: () => ({
    display: 'flex',
    paddingTop: '1rem'
  }),
  button: () => ({
    width: '12rem'
  }),
  buttonText: () => ({
    textTransform: 'capitalize'
  })
}
