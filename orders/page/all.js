const onLoad = require('on-load')

module.exports = {
  needs: {
    'html.hx': 'first',
    'inu.dispatch': 'first',
    app: {
      'layout': 'first',
      'element.pageHeader': 'first'
    },
    orders: {
      'action.loadAll': 'first',
      'get.allProps': 'first',
      'element.ordersPage': 'first'
    }
  },
  create: (api) => {
    function render ({ orders }) {
      var el = api.orders.element.ordersPage(orders)

      onLoad(el, handleLoad)

      return el
    }

    function handleLoad (el) {
      api.inu.dispatch(api.orders.action.loadAll())
    }

    return {
      route: '/orders',
      layout: api.app.layout,
      get: api.orders.get.allProps,
      view: render
    }
  }
}
