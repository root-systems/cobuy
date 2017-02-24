const assign = require('lodash/fp/assign')

module.exports = {
  create: (api) => ({
    update: (model, order) => ({
      model: assign({
        [order.id]: order
      }, model)
    })
  })
}
