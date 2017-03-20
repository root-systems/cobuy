const mapValues = require('lodash/fp/mapValues')
const { StyleSheet } = require('fela-tools')
const { combineRules } = require('fela')

module.exports = {
  needs: {
    app: {
      styles: 'first',
      css: {
        a: 'first'
      }
    },
    'html.hx': 'first',
    'css.renderRule': 'first'
  },
  create: (api) => {

    // this needs to happen _after_
    // app.styles module is created.
    var styleSheet
    process.nextTick(() => {
      const { colors, fonts } = api.app.styles()
      styleSheet = StyleSheet.create({
        header: {
          backgroundColor: colors.primary
        },
        a: api.app.css.a,
        title: {
          color: colors.brightest,
          fontFamily: fonts.sans,
          textAlign: 'center'
        }
      })
    })

    const renderStyles = props => mapValues(rule => {
      return api.css.renderRule(rule, props)
    }, styleSheet)

    return renderPageHeader

    function renderPageHeader (props) {
      const { title, link } = props
      const styles = renderStyles(props)

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
