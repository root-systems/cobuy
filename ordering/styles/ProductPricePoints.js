import { combineRules } from 'fela'

const subText = ({ theme }) => ({
  fontSize: theme.fontSizes[1],
  color: theme.colors.greys[7]
})

const horizontalLine = ({ theme }) => ({
  position: 'absolute',
  top: theme.space[5],
  height: theme.space[2]
})

export default {
  container: ({ theme }) => ({
    position: 'relative',
    marginTop: theme.space[4],
    marginBottom: theme.space[4],
    marginLeft: theme.space[5],
    marginRight: theme.space[5]
  }),
  // this is used by a react-fela.createComponent
  point: ({ theme, point }) => ({
    position: 'absolute',
    top: 0,
    left: `${point * 100}%`,
    transform: 'translate(-50%, 0);',
    textAlign: 'center',
    width: theme.space[6],
    height: theme.space[6],
    borderRadius: '50%',
    borderWidth: theme.space[1],
    borderStyle: 'solid',
    borderColor: theme.colors.primary1,
    backgroundColor: theme.colors.canvas,
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }),
  price: ({ theme }) => ({
    fontSize: theme.fontSizes[2],
    color: theme.colors.greys[9]
  }),
  quantityToMeetPrice: subText,
  quantityAtPrice: subText,
  horizon: combineRules(horizontalLine, ({ theme }) => ({
    zIndex: 3,
    backgroundColor: theme.colors.greys[1],
    width: '100%'
  })),
  // this is used by a react-fela.createComponent
  progressBar: combineRules(horizontalLine, ({ theme, progress, index, numPriceSpecs }) => ({
    zIndex: 4 + index,
    backgroundColor: theme.colors.greys[getGreyIndex({ index, length: numPriceSpecs })],
    width: `${progress * 100}%`
  })),
  // this is used by a react-fela.createComponent
  progressMarker: ({ theme, progress, index, numPriceSpecs }) => ({
    position: 'absolute',
    zIndex: 2,
    backgroundColor: theme.colors.greys[getGreyIndex({ index, length: numPriceSpecs })],
    top: `-${theme.space[3]}`,
    height: `calc(${theme.space[6]} + ${theme.space[4]})`,
    left: `${progress * 100}%`,
    transform: 'translate(-100%, 0);',
    width: theme.space[1]
  })
}

function getGreyIndex ({ index, length }) {
    // (mw) distribute the greys equally
    // caveat: this assumes no more than 8 in length
  return Math.min(Math.floor((1 + index) * (9 / length)), 9)
}
