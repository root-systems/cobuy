const contextSection = ({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  fontSize: theme.fontSizes[-1]
})

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
    objectFit: 'contain'
  }),
  details: () => ({
  }),
  name: ({ theme }) => ({
    marginTop: theme.space[2],
    marginBottom: theme.space[2],
    textAlign: 'center',
    fontSize: theme.fontSizes[4]
  }),
  description: ({ theme }) => ({
    textAlign: 'center',
    fontSize: theme.fontSizes[1]
  }),
  context: ({}) => ({
  }),
  price: contextSection,
  groupQuantity: contextSection,
  yourQuantity: contextSection
}
