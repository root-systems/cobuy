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
    'stroke-width': 5
  }),
  maxLineContainer: ({ value, min, max }) => ({
    position: 'absolute',
    left: value.maximum / (max - min) * 100 + '%',
    top: '-20px'
  }),
  maxLine: () => ({
    position: 'absolute',
    stroke: '#555555',
    'stroke-width': 5
  }),
  slider: () => ({
    '> div:nth-child(1) > div:nth-child(1) > div:nth-child(2)': {
      backgroundColor: 'pink !important'
    },
    '> div:nth-child(1) > div:nth-child(1) > div:nth-child(1)': {
      backgroundColor: 'purple !important'
    }
  })
}
