const onLoad = require('on-load')

module.exports = {
  needs: {
    'html.hx': 'first',
    app: {
      'css.column': 'first',
      'element.pageHeader': 'first'
    },
    orders: {
      'element.orderTabs': 'first'
    }
  },
  create: (api) => ({
    html: (orders) => api.html.hx`
      <div>
        ${api.app.element.pageHeader({
          title: 'orders', 
          link: '/orders'
        })}
        ${api.orders.element.orderTabs(orders)}
      </div>
    `,
    css: api.app.css.column
  })
}
