const { combineRules } = require('fela')

module.exports = {
  needs: {
    'html.hx': 'first',
    'css.renderRule': 'first',
    app: {
      'element.pageHeader': 'first',
      'css.column': 'first'
    }
  },
  create: (api) => () => {
    const { renderRule } = api.css
    const styles = {
      container: renderRule(
        combineRules(
          api.app.css.column, props => ({
          textAlign: 'center'
        }))
      ),
      title: renderRule(props => ({
        fontSize: '4rem'
      })),
      subtext: renderRule(props => ({
        fontSize: '2rem'
      })),
      background: renderRule(props => ({
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.2,
        zIndex: -1,
        backgroundImage: "url('/app/images/background-small.jpg')",
        backgroundSize: 'cover',
        '@media all and (min-width: 400px)': {
          backgroundImage: "url('/app/images/background-large.jpg')"
        }
      }))
    }
    return api.html.hx`
      <div class=${styles.container}>
        ${api.app.element.pageHeader({
          title: 'home',
          link: '/'
        })}
        <h1 class=${styles.title}>
          Cobuy
        </h1>
        <p class=${styles.subtext}>
          Helping you buy good food at good prices, together.
        </p>
        <div class=${styles.background}></div>
      </div>
    `
  }
}
