module.exports = {
  needs: {
    'orders.effect.fetchAll': 'first'
  },
  create: (api) => ({
    update: (model) => ({
      model,
      effect: api.orders.effect.fetchAll()
    })
  })
}
