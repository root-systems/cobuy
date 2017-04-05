const assign = require('lodash/fp/assign')

module.exports = {
  needs: {
    'html.hx': 'first',
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
      // TODO: fix store router so router.params state is
      // populated before the page is rendered.
      // right now it happens after router.listen action
      if (!props.order) return api.html.hx`<div>loading</div>`

      const order = assign(props.order, { orderItems: props.orderItems })
      return api.orders.element.orderPage({ order })
    }
  })
}
