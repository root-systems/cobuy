export default {
  container: () => ({
    position: 'relative'
  }),
  minLineContainer: ({ value }) => ({
    position: 'absolute',
    left: value.minimum / 10 * 100 + '%'
  }),
  minLine: () => ({
    stroke: '#555555',
    'stroke-width': 1
  }),
  maxLineContainer: ({ value }) => ({
    position: 'absolute',
    left: value.maximum / 10 * 100 + '%',
    top: '-20px'
  }),
  maxLine: () => ({
    position: 'absolute',
    stroke: '#555555',
    'stroke-width': 1
  })
}
