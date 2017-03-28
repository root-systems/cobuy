const map = require('lodash/fp/map')

module.exports = {
  needs: {
    app: {
      'css.ul': 'first'
    },
    'orders.element.orderTab': 'first'
  },
  create: (api) => {
    const mapOrders = map(order => {
      return api.orders.element.orderTab({ order })
    })

    const OrderTabList = api.css.Element('ul', api.app.css.ul)

    return ({ orders }) => {
      return OrderTabList(mapOrders(orders))
    }
  }
}
