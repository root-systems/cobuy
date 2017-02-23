module.exports = {
  needs: {
    'orders.get.orders': 'first',
    'orders.get.currentOrderId': 'first'
  },
  create: (api) => [
    api.orders.get.orders,
    api.orders.get.currentOrderId,
    (orders, currentOrderId) => orders[currentOrderId]
  ]
}
