export default {
  container: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // width: '250px',
    // minWidth: '200px',
    padding: theme.space[2],
    margin: theme.space[1]
  }),
  imageContainer: () => ({
  }),
  image: () => ({
    display: 'flex',
    flex: 1,
    maxWidth: '50px',
    maxHeight: '50px',
    objectFit: 'contain'
  }),
  textContainer: () => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  tableRow: ({ theme }) => ({
    ':hover': {
      backgroundColor: theme.colors.greys[1],
      cursor: 'pointer'
    }
  })
}
