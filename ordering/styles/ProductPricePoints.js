import { combineRules } from 'fela'

const point = ({ theme }) => ({
  position: 'absolute',
  transform: 'translate(-50%, 0);',
  textAlign: 'center',
  width: theme.space[6],
  height: theme.space[6],
  borderWidth: theme.space[1],
  borderStyle: 'solid',
  backgroundColor: theme.colors.canvas,
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
})

const pointMainText = ({ theme }) => ({
  fontSize: theme.fontSizes[2],
  color: theme.colors.greys[9]
})
const pointSubText = ({ theme }) => ({
  fontSize: theme.fontSizes[1],
  color: theme.colors.greys[7]
})

const horizontalLine = ({ theme }) => ({
  position: 'absolute',
  top: `calc(${theme.space[6]} + ${theme.space[4]})`,
  height: theme.space[2]
})

export default {
  container: ({ theme }) => ({
    position: 'relative',
    marginTop: theme.space[3],
    marginBottom: theme.space[3],
    height: `calc(${theme.space[7]} + ${theme.space[5]})`,
    marginLeft: `calc(${theme.space[5]} + ${theme.space[3]})`,
    marginRight: `calc(${theme.space[5]} + ${theme.space[3]})`
  }),
  // this is used by a react-fela.createComponent
  pricePoint: combineRules(point, ({ theme, point, isMet }) => ({
    top: 0,
    left: `${point * 100}%`,
    borderColor: isMet ? theme.colors.primary2 : theme.colors.accent2,
    borderRadius: '50%'
  })),
  pricePointPrice: pointMainText,
  pricePointMinimum: pointSubText,
  // this is used by a react-fela.createComponent
  priceMarker: ({ theme, point, isMet }) => ({
    position: 'absolute',
    zIndex: 99,
    backgroundColor: isMet ? theme.colors.primary2 : theme.colors.accent2,
    top: theme.space[6],
    height: theme.space[4],
    left: `${point * 100}%`,
    transform: 'translate(-100%, 0);',
    width: theme.space[1]
  }),
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
    bottom: theme.space[6],
    height: theme.space[4],
    left: `${progress * 100}%`,
    transform: 'translate(-100%, 0);',
    width: theme.space[1]
  }),
  // this is used by a react-fela.createComponent
  progressPoint: combineRules(point, ({ theme, progress, index, numPriceSpecs }) => ({
    bottom: 0,
    left: `${progress * 100}%`,
    borderColor: theme.colors.greys[getGreyIndex({ index, length: numPriceSpecs })]
  })),
  progressPointQuantity: pointMainText,
  progressPointPrice: pointSubText
}

function getGreyIndex ({ index, length }) {
    // (mw) distribute the greys equally
    // caveat: this assumes no more than 8 in length
  return Math.min(Math.floor((1 + index) * (9 / length)), 9)
}
