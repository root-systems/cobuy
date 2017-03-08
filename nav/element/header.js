module.exports = {
  needs: {
    'html.hx': 'first',
    'app.styles': 'first'
  },
  create: (api) => ({
    html: (props) => {
      const { agent } = props
      const { name, email } = agent

      return api.html.hx`
        <div>
          <h1>${name}</h1>
          <h2>${email}</h2>
        </div>
      `
    },
    css: () => {
      const { colors } = api.app.styles()
      return {
        paddingTop: '3rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingBottom: '1rem',
        backgroundColor: colors.primary,
        color: colors.greyscale[0]
      }
    }
  })
}
