const { get } = require('libnested')

module.exports = {
  needs: {
    'html.create': 'first',
    'app.layout': 'first',
    'orders.get.oneProps': 'first'
  },
  create: (api) => ({
    route: '/order/:orderId',
    layout: api.app.layout,
    get: api.orders.get.oneProps,
    view: (props) => api.html.create`
      <h1>${props.order.name}!</h1>  
    `
  })
}
