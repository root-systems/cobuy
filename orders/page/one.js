const { get } = require('libnested')

module.exports = {
  needs: {
    'html.create': 'first',
    'app.layout': 'first',
    orders: {
      'get.oneProps': 'first',
      'element.orderPage': 'first'
    }
  },
  create: (api) => ({
    route: '/orders/:orderId',
    layout: api.app.layout,
    get: api.orders.get.oneProps,
    view: (props) => {
      return api.orders.element.orderPage(props.order)
    }
  })
}
