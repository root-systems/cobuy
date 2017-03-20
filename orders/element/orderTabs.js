const map = require('lodash/fp/map')

module.exports = {
  needs: {
    'html.hx': 'first',
    app: {
      'css.ul': 'first'
    },
    'orders.element.orderTab': 'first'
  },
  create: (api) => {
    const mapOrders = map(api.orders.element.orderTab)

    return {
      html: orders => api.html.hx`
        <ul>
          ${mapOrders(orders)}
        </ul>
      `,
      css: api.app.css.ul
    }
  }
}
