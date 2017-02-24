const map = require('lodash/fp/map')

module.exports = {
  needs: {
    'html.create': 'first',
    'inu.dispatch': 'first',
    'app.layout': 'first',
    orders: {
      'action.loadAll': 'first',
      'get.allProps': 'first'
    }
  },
  create: (api) => {
    /*
          supplies:
          <ul>
            ${mapSupplys(order.supplys)}
          </ul>

    const mapSupplys = map(supply = api.html.create`
      <li>
        <a href=${`/order/${order.id}`}>
          ${order.name}
        </a>
      </li>
    `)
    */
    const mapOrders = map(order => api.html.create`
      <li>
        <a href=${`/order/${order.id}`}>
          ${order.name}
        </a>
      </li>
    `)

    function renderOrders (orders) {
      return api.html.create`
        <ul onload=${handleLoad}>
          ${mapOrders(orders)}
        </ul>
      `
    }

    function handleLoad (el) {
      api.inu.dispatch(api.orders.action.loadAll())
    }

    return {
      route: '/orders',
      layout: api.app.layout,
      get: api.orders.get.allProps,
      view: (props, dispatch) => {
        return renderOrders(props.orders)
      }
    }
  }
}
