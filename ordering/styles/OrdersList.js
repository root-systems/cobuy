export default {
  container: () => ({
    display: 'flex',
    flexDirection: 'column'
  }),
  intro: ({ theme }) => ({
    textAlign: 'center',
    fontSize: theme.fontSizes[8]
  }),
  list: () => ({
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none'
  }),
  labelText: () => ({
    textTransform: 'capitalize'
  }),
  header: ({ theme }) => ({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  }),
  title: ({ theme }) => ({
    fontSize: theme.fontSizes[5]
  }),
  agents: () => ({
    display: 'flex',
    justifyContent: 'flex-end'
  })
}
