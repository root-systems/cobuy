const map = require('lodash/fp/map')

module.exports = {
  needs: {
    'inu.html': 'first',
    'app.modules.layout': 'first',
    orders: {
      'actions.loadAll': 'first',
      'get.allProps': 'first'
    }
  },
  create: (api) => {
    const mapOrders = map(order => api.inu.html`
      <li>
        <a href=${`/order/${order.id}`}>
          ${order.name}
        </a>
      </li>
    `)

    return {
      route: '/orders',
      view: (model, dispatch) => {
        const layout = api.app.modules.layout(model, dispatch)
        const props = api.orders.get.allProps(model)
        const view = renderOrders(props.orders)

        return layout(view)

        function renderOrders (orders) {
          return api.inu.html`
            <ul onload=${handleLoad}>
              ${mapOrders(orders)}
            </ul>
          `
        }

        function handleLoad (el) {
          dispatch(api.orders.actions.loadAll())
        }
      }
    }
  }
}
