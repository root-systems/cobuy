module.exports = {
  needs: {
    'ordering.get.itemsByOrder': 'first',
    'orders.get.currentOrderId': 'first'
  },
  create: (api) => [
    api.ordering.get.itemsByOrder,
    api.orders.get.currentOrderId,
    (itemsByOrder, currentOrderId) => itemsByOrder[currentOrderId]
  ]
}
