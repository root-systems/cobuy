const { get } = require('libnested')

module.exports = {
  needs: {
    'inu.html': 'first',
    'app.modules.layout': 'first',
    'orders.get.oneProps': 'first'
  },
  create: (api) => ({
    route: '/order/:orderId',
    view: (model, dispatch) => {
      const layout = api.app.modules.layout(model, dispatch)
      const props = api.orders.get.oneProps(model)
      const view = api.inu.html`
        <h1>${props.order.name}!</h1>  
      `
      return layout(view)
    }
  })
}
