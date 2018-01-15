export default {
  container: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.space[4]
  }),
  header: ({ theme }) => ({
    padding: theme.space[3],
    display: 'flex',
    flexDirection: 'row',
    fontSize: theme.fontSizes[3]
  }),
  image: () => ({
    flex: 1,
    objectFit: 'contain'
  }),
  details: ({ theme }) => ({
    flex: 1,
    padding: theme.space[2],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  name: ({ theme }) => ({
    fontSize: theme.fontSizes[3]
  }),
  description: ({ theme }) => ({
    fontSize: theme.fontSizes[0]
  })
}
