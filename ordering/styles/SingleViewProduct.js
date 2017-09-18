export default {
  container: ({ theme }) => ({
    display: 'flex',
    flex: 1,
    padding: theme.space[4]
  }),
  imageContainer: ({ theme }) => ({
    height: '300px',
    width: '300px',
    minWidth: '150px',
    marginRight: theme.space[4]
  }),
  image: () => ({
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  }),
  infoContainer: () => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  })
}
