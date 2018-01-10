import { combineRules } from 'fela'

export default {
  container: ({ theme }) => ({
  }),
  name: ({ theme }) => ({
    fontSize: theme.fontSizes[5]
  }),
  taskNameText: ({ theme }) => ({
  }),
  button: ({ theme }) => ({
    width: '20%',
    color: 'white'
  })
}
