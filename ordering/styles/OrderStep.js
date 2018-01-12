import { combineRules } from 'fela'

export default {
  container: ({ theme }) => ({
  }),
  name: ({ theme }) => ({
    fontSize: theme.fontSizes[5]
  }),
  taskNameText: ({ theme }) => ({
    color: theme.colors.alternateText,
    textTransform: 'capitalize'
  }),
  button: ({ theme }) => ({
    width: '20%'
  }),
  labelText: ({ theme }) => ({
    textTransform: 'capitalize'
  }),
  descriptionText: ({ theme }) => ({
    textTransform: 'initial'
  })
}
