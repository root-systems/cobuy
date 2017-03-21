module.exports = {
  needs: {
    'html.hx': 'first',
    app: {
      layout: 'first',
      'element.home': 'first'
    }
  },
  create: (api) => ({
    route: '/',
    layout: api.app.layout,
    view: api.app.element.home
  })
}
