const map = require('lodash/fp/map')
const onLoad = require('on-load')

module.exports = {
  needs: {
    'html.hx': 'first',
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
      var el = api.html.hx`
        <ul>
          ${mapOrders(orders)}
        </ul>
      `

      onLoad(el, handleLoad)

      return el
    }

    function render (props) {
      const { me, orders } = props

      return api.html.hx`
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
