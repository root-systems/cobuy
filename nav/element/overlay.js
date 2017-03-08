module.exports = {
  needs: {
    'html.hx': 'first',
    'app.styles': 'first'
  },
  create: (api) => ({
    html: (props) => {
      return api.html.hx`
        <div
          events=${{
            click: props.emitToggle
          }}
        >
        </div>
      `
    },
    css: () => {
      const { colors } = api.app.styles()
      return {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: colors.greyscale[6],
        opacity: 0.6
      }
    }
  })
}
