module.exports = {
  needs: {
    'orders.get.currentOrder': 'first',
    'ordering.get.currentItems': 'first'
  },
  create: (api) => ({
    order: api.orders.get.currentOrder,
    orderItems: api.ordering.get.currentItems
  })
}
