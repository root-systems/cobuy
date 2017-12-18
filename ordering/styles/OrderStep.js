import { combineRules } from 'fela'

const opacity = ({ step: { completed, ready } = {} }) => ({
  opacity: (ready || completed) ? '1' : '0.5'
})

const readyColor = ({ theme, step: { ready } = {} }) => ({
  color: ready ? theme.colors.primary1 : theme.colors.text,
  borderColor: ready ? theme.colors.primary1 : theme.colors.text
})

const row = () => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline'
})

export default {
  container: combineRules(
    row,
    opacity
  ),
  link: combineRules(
    row,
    () => ({
      textDecoration: 'none'
    }),
    readyColor
  ),
  icon: combineRules(
    ({ step: { completed, ready } = {} }) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '4rem',
      width: '4rem',
      borderWidth: '0.25rem',
      borderStyle: 'solid',
      borderRadius: '2rem',
    }),
    readyColor
  ),
  info: () => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  })
}
