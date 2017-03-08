module.exports = {
  needs: {
    'html.hx': 'first',
    'app.styles': 'first'
  },
  create: (api) => ({
    html: (props, children) => {
      const { onToggle } = props

      return api.html.hx`
        <div
          events=${{
            click: onToggle
          }}
        >
          ${'≡'}
        </div>
      `
    },
    css: () => {
      const { colors } = api.app.styles()
      return {
        position: 'fixed',
        cursor: 'pointer',
        padding: '1rem',
        fontSize: '2.25rem',
        color: colors.greyscale[0]
      }
    }
  })
}
