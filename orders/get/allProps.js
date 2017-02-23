module.exports = {
  needs: {
    'orders.get.orders': 'first'
  },
  create: (api) => ({
    orders: api.orders.get.orders
  })
}
