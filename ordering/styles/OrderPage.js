export default {
  container: () => ({}),
  title: ({ theme }) => ({
    fontSize: theme.fontSizes[8],
    color: theme.colors.text
  }),
  agents: () => ({
    display: 'flex',
    justifyContent: 'space-around'
  }),
  agent: ({ theme }) => ({
    fontSize: theme.fontSizes[3],
    color: theme.colors.text
  }),
  stepper: () => ({})
}
