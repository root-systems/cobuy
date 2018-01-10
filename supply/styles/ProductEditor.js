export default {
  container: () => ({
  }),
  saveButton: ({ theme }) => ({
    width: '20%',
    margin: '10px'
  }),
  buttonText: ({ theme }) => ({
    textTransform: 'capitalize',
    color: theme.colors.alternateText
  })
}
