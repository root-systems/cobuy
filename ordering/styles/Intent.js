export default {
  container: () => ({
    position: 'relative'
  }),
  minLineContainer: ({ value, min, max }) => ({
    position: 'absolute',
    left: value.minimum / (max - min) * 100 + '%'
  }),
  minLine: () => ({
    stroke: '#555555',
    'stroke-width': 1
  }),
  maxLineContainer: ({ value, min, max }) => ({
    position: 'absolute',
    left: value.maximum / (max - min) * 100 + '%',
    top: '-20px'
  }),
  maxLine: () => ({
    position: 'absolute',
    stroke: '#555555',
    'stroke-width': 1
  })
}
