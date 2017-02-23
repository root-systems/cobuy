module.exports = {
  needs: {
    'orders.effects.fetchAll': 'first'
  },
  create: (api) => ({
    update: (model) => ({
      model,
      effect: api.orders.effects.fetchAll()
    })
  })
}
