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
  create: (api) => {
    const Page = api.css.Element('div', api.app.css.column)

    return ({ orders }) => Page([
      api.app.element.pageHeader({
        title: 'orders',
        link: '/orders'
      }),
      api.orders.element.orderTabs({ orders })
    ])
  }
}
