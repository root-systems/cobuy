module.exports = {
  needs: {
    'html.hx': 'first',
    'app.layout': 'first'
  },
  create: (api) => ({
    route: '/',
    layout: api.app.layout,
    view: (model) => api.html.hx`
      <div>home!</div>  
    `
  })
}
