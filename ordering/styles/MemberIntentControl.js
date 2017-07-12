export default {
  container: () => ({
    display: 'flex',
    flexDirection: 'column'
  }),
  inputsContainer: () => ({
    display: 'flex',
    justifyContent: 'space-around'
  }),
  slidersContainer: () => ({
    flexGrow: '1',
    position: 'relative'
  }),
  minLineContainer: ({ value, min, max }) => ({
    position: 'absolute',
    left: value.minimum / (max - min) * 100 + '%',
    zIndex: 1,
    marginLeft: '-0.5rem'
  }),
  minLine: ({ theme: { colors: { greys } } }) => ({
    stroke: greys[7],
    strokeWidth: '2rem'
  }),
  maxLineContainer: ({ value, min, max }) => ({
    position: 'absolute',
    left: value.maximum / (max - min) * 100 + '%',
    zIndex: 1,
    marginLeft: '-0.5rem'
  }),
  maxLine: ({ theme: { colors: { greys } } }) => ({
    stroke: greys[7],
    strokeWidth: '2rem'
  }),
  desiredLineContainer: ({ value, min, max }) => ({
    position: 'absolute',
    left: `${value.minimum / (max - min) * 100}%`,
    width: `calc(${(value.maximum - value.minimum) / (max - min) * 100}% + 1rem)`,
    zIndex: 1,
    marginLeft: '-0.5rem'
  }),
  desiredLine: ({ theme: { colors: { accent1 } } }) => ({
    stroke: accent1,
    strokeWidth: '1rem'
  }),
  input: () => ({
  }),
  sliderContainer: () => ({
    position: 'relative',
  }),
  slider: () => ({
    '> div:nth-child(1)': {
      marginTop: '0 !important'
    },
    '> div:nth-child(1) > div:nth-child(1) > div:nth-child(2)': {
      height: '50% !important',
      backgroundColor: 'white !important',
      borderBottom: '2px dotted black'
    },
    '> div:nth-child(1) > div:nth-child(1) > div:nth-child(1)': {
      height: '50% !important',
      backgroundColor: 'white !important',
      borderBottom: '2px dotted black'
    },
    '> div:nth-child(1) > div:nth-child(2)': {
      zIndex: '3 !important'
    }
  })
}
