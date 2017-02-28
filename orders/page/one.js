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
      // TODO: fix store router so router.params state is
      // populated before the page is rendered.
      // right now it happens after router.listen action
      if (!props.order) return api.html.create`<div>loading</div>`
      return api.orders.element.orderPage(props.order)
    }
  })
}
