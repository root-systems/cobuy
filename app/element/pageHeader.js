const mapValues = require('lodash/fp/mapValues')

module.exports = {
  needs: {
    app: {
      css: {
        a: 'first'
      }
    },
    'html.hx': 'first'
  },
  create: (api) => {
    const { connect, combineRules } = api.css

    const Styles = props => renderRule => ({
      header: ({ theme }) => ({
        backgroundColor: theme.colors.primary
      }),
      a: api.app.css.a,
      title: ({ theme }) => ({
        color: theme.colors.brightest,
        fontFamily: theme.fonts.sans,
        textAlign: 'center'
      })
    })

    return connect(Styles, renderPageHeader)

    function renderPageHeader (props) {
      const { styles, title, link } = props

      return api.html.hx`
        <header class=${styles.header}>
          <a class=${styles.a} href=${link}>
            <h1 class=${styles.title}>${title}</h1>
          </a>
        </header>
      `
    }
  }
}
