export default {
  container: ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  title: ({ theme }) => ({
    marginTop: '0',
    paddingLeft: '24px', // to align to rest of material dialog
    color: theme.colors.text,
    fontSize: theme.fontSizes[3],
    lineHeight: theme.fontSizes[5],
    fontWeight: theme.fontWeights.regular,
    textTransform: 'capitalize'
  }),
  labelText: () => ({
    textTransform: 'capitalize'
  }),
  dialog: ({ theme }) => ({
    margin: '0 auto'
  })
}
