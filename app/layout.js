module.exports = {
  needs: {
    'html.hx': 'first',
    'css.renderStatic': 'first',
    'app.styles': 'first'
  },
  create: (api) => {
    // insert normalize
    // TODO add to `catstack`
    var normalize = document.createElement('link')
    normalize.href = 'https://necolas.github.io/normalize.css/latest/normalize.css'
    normalize.rel = 'stylesheet'
    normalize.type = 'text/css'
    document.head.appendChild(normalize)

    // needs to happen after
    // css.renderStatic is loaded
    process.nextTick(() => {
      const { colors } = api.app.styles()
      api.css.renderStatic({
        color: colors.greyscale[9]
      }, 'html,body,input')
    })

    return (view) => {
      return (model) => api.html.hx`
        <div>
          <nav>
            <a href='/'>home</a>
            <a href=${`/orders`}>orders!</a>
            <a href='/nope'>nope</a>
          </nav>
          ${view(model)}
        </div>
      `
    }
  }
}
