module.exports = {
  needs: {
    pull: {
      pipe: 'first',
      map: 'first'
    },
    orders: {
      'service.all': 'first',
      'action.set': 'first'
    }
  },
  create: (api) => ({
    run: (model, order) => api.pull.pipe(
      api.orders.service.all(),
      api.pull.map(api.orders.action.set)
    )
  })
}
