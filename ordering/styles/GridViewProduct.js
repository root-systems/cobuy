export default {
  container: ({ theme }) => ({
    width: '250px',
    minWidth: '200px',
    padding: theme.space[2],
    margin: theme.space[1],
    ':hover': {
      cursor: 'pointer'
    }
  }),
  imageContainer: () => ({
  }),
  image: () => ({
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '230px',
    objectFit: 'contain'
  }),
  textContainer: () => ({
  })
}
