const { pull } = require('catstack')

module.exports = {
  needs: {
    'orders.service.all': 'first',
    'orders.actions.set': 'first',
  },
  create: (api) => ({
    run: (model, order) => pull(
      api.orders.service.all(),
      pull.map(api.orders.actions.set)
    )
  })
}
