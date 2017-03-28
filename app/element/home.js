module.exports = {
  needs: {
    'html.hx': 'first',
    app: {
      'element.pageHeader': 'first',
      'css.column': 'first'
    }
  },
  create: (api) => {
    const { connect, combineRules } = api.css

    const Styles = props => renderRule => ({
      container: combineRules(
        api.app.css.column,
        props => ({
          textAlign: 'center'
        })
      ),
      title: {
        fontSize: '4rem'
      },
      subtext: {
        fontSize: '2rem'
      },
      background: {
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
      }
    })

    return connect(Styles, Element)

    function Element ({ styles }) {
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
}
