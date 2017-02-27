const map = require('lodash/fp/map')

module.exports = {
  needs: {
    'html.create': 'first',
    'inu.dispatch': 'first',
    'app.layout': 'first',
    orders: {
      'action.loadAll': 'first',
      'get.allProps': 'first',
      'element.orderTab': 'first'
    }
  },
  create: (api) => {
    const mapOrders = map(api.orders.element.orderTab)

    function renderOrders (orders) {
      return api.html.create`
        <ul onload=${handleLoad}>
          ${mapOrders(orders)}
        </ul>
      `
    }

    function render (props) {
      const { me, orders } = props

      return api.html.create`
        <div>
          <div>${me.name}</div>
          ${renderOrders(orders)}
        </div>
      `
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
