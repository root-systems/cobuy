module.exports = {
  needs: {
    'orders.get.orders': 'first',
    'agents.get.me': 'first'
  },
  create: (api) => ({
    orders: api.orders.get.orders,
    me: api.agents.get.me
  })
}
