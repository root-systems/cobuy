import { combineRules } from 'fela'
import BigMath from 'bigmath'

const box = ({ theme }) => ({
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

// these are used by a react-fela.createComponent not react-fela.connect
export const priceMarker = ({ theme, point, isMet }) => ({
  position: 'absolute',
  zIndex: 99,
  backgroundColor: isMet ? theme.colors.primary2 : theme.colors.accent2,
  top: theme.space[6],
  height: theme.space[4],
  left: `${BigMath.min('100', BigMath.mul(point, '100'))}%`,
  transform: 'translate(-100%, 0);',
  width: theme.space[1]
})

export const pricePoint = combineRules(box, ({ theme, point, isMet }) => ({
  top: 0,
  left: `${BigMath.min('100', BigMath.mul(point, '100'))}%`,
  borderColor: isMet ? theme.colors.primary2 : theme.colors.accent2,
  borderRadius: '50%'
}))

export const progressBar = combineRules(horizontalLine, ({ theme, progress, isMet, hasMet, index, numPoints }) => ({
  zIndex: 50 - index,
  backgroundColor: getProgressColor({ theme, isMet, hasMet, index, length: numPoints }),
  width: `${BigMath.min('100', BigMath.mul(progress, '100'))}%`,
}))

export const progressMarker = ({ theme, progress, isMet, hasMet, index, numPoints }) => ({
  position: 'absolute',
  zIndex: 30 - index,
  backgroundColor: getProgressColor({ theme, isMet, hasMet, index, length: numPoints }),
  bottom: theme.space[6],
  height: theme.space[4],
  left: `${BigMath.min('100', BigMath.mul(progress, '100'))}%`,
  transform: 'translate(-100%, 0);',
  width: theme.space[1]
})

export const progressPoint = combineRules(box, ({ theme, progress, isMet, hasMet, index, numPoints }) => ({
  bottom: 0,
  zIndex: 40 - index,
  left: `${BigMath.min('100', BigMath.mul(progress, '100'))}%`,
  borderColor: getProgressColor({ theme, isMet, hasMet, index, length: numPoints })
}))

export default {
  container: ({ theme }) => ({
    position: 'relative',
    marginTop: theme.space[3],
    marginBottom: theme.space[3],
    height: `calc(${theme.space[7]} + ${theme.space[5]})`,
    marginLeft: `calc(${theme.space[5]} + ${theme.space[3]})`,
    marginRight: `calc(${theme.space[5]} + ${theme.space[3]})`
  }),
  pricePointPrice: pointMainText,
  pricePointMinimum: pointSubText,
  horizon: combineRules(horizontalLine, ({ theme }) => ({
    zIndex: 3,
    backgroundColor: theme.colors.greys[1],
    width: '100%'
  })),
  progressPointQuantity: pointMainText,
  progressPointPrice: pointSubText
}

function getProgressColor ({ theme, isMet, hasMet, index, length }) {
  // first met progress is primary color, subsequent progress are distributed greys
  return (isMet && index === 0)
    ? theme.colors.primary3
    : hasMet
      ? theme.colors.greys[getGreyIndex({ index: index - 1, length: length - 1 })]
      : theme.colors.greys[getGreyIndex({ index, length })]
}

function getGreyIndex ({ index, length }) {
    // (mw) distribute the greys equally
    // caveat: this assumes no more than 7 in length
  return Math.min(Math.floor((1 + index) * (9 / length)), 9)
}

