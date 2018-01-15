export default {
  container: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.space[4]
  }),
  header: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    fontSize: theme.fontSizes[3]
  }),
  imageContainer: ({ theme }) => ({
    flex: 0.5,
    marginRight: theme.space[4]
  }),
  image: () => ({
    objectFit: 'contain'
  }),
  details: ({ theme }) => ({
    padding: theme.space[2],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }),
  name: ({ theme }) => ({
    fontSize: theme.fontSizes[3]
  }),
  description: ({ theme }) => ({
    fontSize: theme.fontSizes[0]
  })
}
