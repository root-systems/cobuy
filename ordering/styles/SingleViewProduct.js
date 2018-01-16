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
  imageContainer: ({ theme }) => ({
    flexGrow: '1',
    flexBasis: '0',
    height: theme.space[7]
  }),
  image: () => ({
    height: '100%',
    width: '100%',
    objectFit: 'contain'
  }),
  details: ({ theme }) => ({
    flexGrow: '1',
    flexBasis: '0',
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
