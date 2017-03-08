const { combineRules } = require('fela')

module.exports = {
  needs: {
    'html.hx': 'first',
    app: {
      'styles': 'first',
      'css.column': 'first'
    },
    'nav.element': {
      header: 'first',
      body: 'first',
      footer: 'first'
    }
  },
  create: (api) => ({
    html: (props, children) => {
      const { header, body, footer } = api.nav.element

      return api.html.hx`
        <nav>
          ${[
            header(props.header),
            body(props.body),
            footer(props.footer)
          ]}
        </nav>
      `
    },
    css: combineRules(api.app.css.column, () => {
      const { colors } = api.app.styles()
      return {
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: colors.greyscale[2],
      }
    })
  })
}
