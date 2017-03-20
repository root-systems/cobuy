module.exports = {
  needs: {
    'html.hx': 'first',
    'css.renderStatic': 'first',
    'app.styles': 'first',
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

    // needs to happen after
    // css.renderStatic is loaded
    process.nextTick(() => {
      const { colors, fonts } = api.app.styles()
      api.css.renderStatic({
        color: colors.greyscale[9],
        fontFamily: fonts.sans
      }, 'html,body,input')
    })

    return (view) => {
      return (model) => api.html.hx`
        <div>
          ${api.nav.element.nav(api.nav.get.nav(model))}
          ${view(model)}
        </div>
      `
    }
  }
}
