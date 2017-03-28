module.exports = {
  needs: {
    'html.hx': 'first',
    css: {
      Element: 'first',
      renderStatic: 'first'
    },
    'app.theme': 'reduce',
    nav: {
      'get.nav': 'first',
      'element.nav': 'first'
    }
  },
  create: (api) => {
    if (process.browser) {
      // insert normalize
      // TODO add to `catstack`
      var normalize = document.createElement('link')
      normalize.href = 'https://necolas.github.io/normalize.css/latest/normalize.css'
      normalize.rel = 'stylesheet'
      normalize.type = 'text/css'
      document.head.appendChild(normalize)

      // TODO add way to add this to `catstack`
      var roboto = document.createElement('link')
      roboto.href = 'https://fonts.googleapis.com/css?family=Roboto:300'
      roboto.rel = 'stylesheet'
      roboto.type = 'text/css'
      document.head.appendChild(roboto)
    }

    const { Element, renderStatic } = api.css

    // must happen after app.theme
    // TODO this should be something in catstack
    process.nextTick(() => {
      const { colors, fonts } = api.app.theme()
      renderStatic({
        color: colors.greyscale[9],
        fontFamily: fonts.sans
      }, 'html,body,input')
    })

    // TODO move to element?
    const layoutStyles = (props) => ({})
    const Layout = Element('div', layoutStyles)

    return (view) => {
      return (model) => Layout([
        api.nav.element.nav(api.nav.get.nav(model)),
        view(model)
      ])
    }
  }
}
