export default {
  container: ({ theme }) => ({
    display: 'relative'
  }),
  // this is used by a react-fela.createComponent
  point: ({ theme, point }) => ({
    display: 'absolute',
    marginLeft: `${point * 100}%`,
    padding: theme.space[2],
    borderColor: theme.colors.primary1,
    display: 'flex',
    flexDirection: 'column'
  }),
  quantityToMeetPrice: ({ theme, point }) => ({
    fontSize: theme.fontSizes[3]
  }),
  quantityAtPrice: ({ theme, point }) => ({
    fontSize: theme.fontSizes[5]
  }),
  // this is used by a react-fela.createComponent
  progress: ({ theme, progress }) => ({
    padding: '2px',
    backgroundColor: 'black',
    width: `${progress * 100}%`
  })
}
