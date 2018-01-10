import { combineRules } from 'fela'

export default {
  container: ({ theme }) => ({
  }),
  name: ({ theme }) => ({
    fontSize: theme.fontSizes[5]
  }),
  taskNameText: ({ theme }) => ({
    color: theme.colors.alternateText
  }),
  button: ({ theme }) => ({
    width: '20%'
  })
}
