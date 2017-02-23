module.exports = {
  needs: {
    'orders.get.currentOrder': 'first'
  },
  create: (api) => ({
    order: api.orders.get.currentOrder
  })
}
